package com.changbi.magazineadmin.common.util;

import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.changbi.magazineadmin.common.CommonValues;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Component
@Slf4j
public class FileUtil {
    public static String accessKey;
    public static String secretKey;
    public static String endPoint;
    public static String regionName;
    public static String serverMode;

    @Value("${cloud.ncp.endPoint}")
    public void setEndPoint(String value) {FileUtil.endPoint = value;}

    @Value("${cloud.ncp.regionName}")
    public void setRegionName(String value) {FileUtil.regionName = value;}

    @Value("${cloud.ncp.credentials.access-key}")
    public void setAccessKey(String key){
        FileUtil.accessKey = key;
    }

    @Value("${cloud.ncp.credentials.secret-key}")
    public void setSecretKey(String key){
        FileUtil.secretKey = key;
    }

    @Value("${spring.profiles.active}")
    public void setServerMode(String key){
        FileUtil.serverMode = key;
    }

    /**
     * 파일 변환
     * Multipart object -> File object
     * */
    public static File convert(MultipartFile file) throws Exception {
        File convFile = new File(file.getOriginalFilename());
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    /*original file name to uuid file name*/
    public static String renamedFileName(String orgFilename){
        //파일 확장자
        String ext = orgFilename.substring(orgFilename.lastIndexOf("."), orgFilename.length());

        String nowDate = new SimpleDateFormat("yyMMdd").format(new Date());
        UUID uuid = UUID.randomUUID();

        String result = nowDate + "_" + uuid.toString() + ext;

        return result;
    }

    /*NCP Object Storage File upload*/
    public static String fileUploadNCP(File uploadFile, String fileDir){

        String result = null;

        //NCP  접속 정보
        final String endPoint = FileUtil.endPoint;
        final String regionName = FileUtil.regionName;
        final String accessKey = FileUtil.accessKey;
        final String secretKey = FileUtil.secretKey;

        // S3 client 생성
        final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endPoint, regionName))
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
                .build();

        //파일 업로드 위치 및 파일 이름 설정
        LocalDateTime now = LocalDateTime.now();
        String bucketName = "";
        if("prod".equals(FileUtil.serverMode)){
            bucketName = CommonValues.NCP_BUCKET_NAME_PROD;
        }else{
            bucketName = CommonValues.NCP_BUCKET_NAME_DEV;
        }

        String originalFileName = uploadFile.getName().trim();
        String renamedFileName = FileUtil.renamedFileName(originalFileName);
        log.debug("upload file name = {}", originalFileName);


        String objectName = fileDir + now.getYear() + "/"+ now.getMonthValue() + "/" + renamedFileName;
        log.debug("upload Path = {}", objectName);
        //String objectName = originalFileName;
        //String objectName = "test";

        String ncpFilePath = endPoint+"/"+bucketName+"/"+objectName;

        //File file = new File(CommonValues.FILE_UPLOAD_DIR + "신동호.jpeg");
        File file = uploadFile;
        long contentLength = file.length();
        long partSize = 10 * 1024 * 1024;

        try {
            // initialize and get upload ID
            //InitiateMultipartUploadResult initiateMultipartUploadResult = s3.initiateMultipartUpload(new InitiateMultipartUploadRequest(bucketName, objectName));

            InitiateMultipartUploadRequest initiateMPURequest = new InitiateMultipartUploadRequest(bucketName, objectName);

            initiateMPURequest.setCannedACL(CannedAccessControlList.PublicRead);

            InitiateMultipartUploadResult initiateMultipartUploadResult = s3.initiateMultipartUpload(initiateMPURequest);

            String uploadId = initiateMultipartUploadResult.getUploadId();



            // upload parts
            List<PartETag> partETagList = new ArrayList<PartETag>();

            long fileOffset = 0;
            for (int i = 1; fileOffset < contentLength; i++) {
                partSize = Math.min(partSize, (contentLength - fileOffset));

                UploadPartRequest uploadPartRequest = new UploadPartRequest()
                        .withBucketName(bucketName)
                        .withKey(objectName)
                        .withUploadId(uploadId)
                        .withPartNumber(i)
                        .withFile(file)
                        .withFileOffset(fileOffset)
                        .withPartSize(partSize);

                UploadPartResult uploadPartResult = s3.uploadPart(uploadPartRequest);
                partETagList.add(uploadPartResult.getPartETag());

                fileOffset += partSize;
            }

            // abort
            // s3.abortMultipartUpload(new AbortMultipartUploadRequest(bucketName, objectName, uploadId));

            // complete
            CompleteMultipartUploadResult completeMultipartUploadResult = s3.completeMultipartUpload(new CompleteMultipartUploadRequest(bucketName, objectName, uploadId, partETagList));

            result = ncpFilePath;
        } catch (AmazonS3Exception e) {
            log.error("AmazonS3Exception File upload error", e);

        } catch(SdkClientException e) {
            log.error("SdkClientException File upload error", e);
        } finally {
            //업로드 후 해당 파일 삭제
            uploadFile.delete();
        }
        return result;
    }

}
