package com.tutomato.bootshopadmin.common;

public class CommonValues {

    /*사용자 권한 등급*/
    public static final String AUTH_SUPER_ADMIN = "ROLE_SUPER";
    public static final String AUTH_ADMIN = "ROLE_ADMIN";
    public static final String AUTH_CLIENT = "ROLE_CLIENT";

    public static final String IMG_UPLOAD_DIR = "images/";
    public static final String FILE_UPLOAD_DIR = "files/";
    public static final String POST_UPLOAD_DIR = "post/";
    public static final String NCP_BUCKET_NAME_DEV = "dev-magazine-changbi";
    public static final String NCP_BUCKET_NAME_PROD = "magazine-changbi";

    /*Result Code*/
    public static final String RESULT_CODE_ERROR = "9999";
    public static final String RESULT_CODE_SUCCESS = "0000";

    /*Result Message*/
    public static final String RESULT_MSG_INSERT_SUCCESS = "등록에 성공하였습니다.";
    public static final String RESULT_MSG_INSERT_FAIL = "등록에 실패하였습니다.";
    public static final String RESULT_MSG_UPDATE_SUCCESS = "수정에 성공하였습니다.";
    public static final String RESULT_MSG_UPDATE_FAIL = "수정에 실패하였습니다.";
    public static final String RESULT_MSG_DELETE_SUCCESS = "삭제에 성공하였습니다.";
    public static final String RESULT_MSG_DELETE_FAIL = "삭제에 실패하였습니다.";
    public static final String RESULT_MSG_SYSTEM_ERROR = "시스템 에러 발생. 관리자에게 문의해 주세요";

    /*logging value*/
    public static final String LOGGING_VALUE_INSERT = "게시물 등록";
    public static final String LOGGING_VALUE_UPDATE = "게시물 수정";
    public static final String LOGGING_VALUE_DELETE = "게시물 삭제";


    /*file type*/
    public static final String FILE_TYPE_IMG = "image";
    public static final String FILE_TYPE_FILE = "file";
    public static final String FILE_TYPE_POST = "post";


    public static final String BASE_FILE_DIR_DEV = "D:/document/test";
    public static final String BASE_FILE_DIR_REAL = "/home/changbi/file/temp";
}
