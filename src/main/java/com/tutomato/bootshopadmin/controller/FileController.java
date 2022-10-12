package com.tutomato.bootshopadmin.controller;

import com.tutomato.bootshopadmin.common.CommonValues;
import com.tutomato.bootshopadmin.common.util.FileUtil;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.PrintWriter;
import java.util.HashMap;

@RestController
@RequestMapping("/file")
@NoArgsConstructor
@Slf4j
public class FileController {

    /*CKEditor 본문 파일 업로드*/
    @PostMapping("/ckeditor/image/upload")
    public void postImage(MultipartFile upload, HttpServletResponse response, HttpServletRequest request){
        PrintWriter pw = null;
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html; charset=utf-8");
        String callback = request.getParameter("CKEditorFuncNum");
        String result = "";

        if(upload.isEmpty()){
            throw new NullPointerException("파일이 존재하지 않습니다.");
        }

        try{
            File convertFile = FileUtil.convert(upload);
            result = FileUtil.fileUploadNCP(convertFile, CommonValues.IMG_UPLOAD_DIR+"editor/");

            pw = response.getWriter();
            pw.println("<script>window.parent.CKEDITOR.tools.callFunction("+callback+",'"+result+"','이미지가 업로드되었습니다.')"+"</script>");
            pw.flush();

        }catch (Exception e){
            pw.println("<script>window.parent.CKEDITOR.tools.callFunction("+callback+",'"+result+"','(시스템 오류 발생)이미지 업로드에 실패하였습니다.')"+"</script>");
            pw.flush();
            log.error("CKEditor file upload Error", e);
        }finally {
            pw.close();
        }
    }

    /*일반 파일 업로드*/
    @PostMapping("/upload/{fileType}")
    @ResponseBody
    public HashMap<String, String> upload(@RequestParam("files") MultipartFile uploadFile,
                                          @PathVariable("fileType")String type) throws Exception {

        HashMap<String, String> resultMap = new HashMap<>();

        //전달 파일 검증
        if(uploadFile.isEmpty()){

            resultMap.put("resultCd", "9999");
            resultMap.put("resultMsg", "파일을 선택해 주세요");

            return resultMap;

        }else{
            //파일 변환
            File upload = FileUtil.convert(uploadFile);
            resultMap.put("orgFileNm", uploadFile.getOriginalFilename());
            String result = "";
            //NCP 파일 업로드
            if(type != null && !"".equals(type)){
                if(CommonValues.FILE_TYPE_IMG.equals(type)){
                    result = FileUtil.fileUploadNCP(upload, CommonValues.IMG_UPLOAD_DIR);
                }else if(CommonValues.FILE_TYPE_FILE.equals(type)){
                    result = FileUtil.fileUploadNCP(upload, CommonValues.FILE_UPLOAD_DIR);
                }else if(CommonValues.FILE_TYPE_POST.equals(type)){
                    result = FileUtil.fileUploadNCP(upload, CommonValues.POST_UPLOAD_DIR);
                }

                resultMap.put("resultCd", "0000");
                resultMap.put("resultMsg", result);

            }else {
                throw new IllegalArgumentException("파일 경로가 존재하지 않습니다.");
            }

        }

        return resultMap;
    }
}
