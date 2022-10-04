let main = {

    init : function(){

        let _this = this;

        $("#signUpBtn").on("click", function (){
            _this.signUp();
        });

        $("#loginBtn").on("click", function (){
            _this.checkFailCount();
        });
    },
    checkFailCount : function (){
        $.ajax({
            url: "/admin/validate",
            method: "POST",
            dataType: "json",
            data: $("#adminId").val(),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if(result == true){
                    $("#loginFrm").submit();
                }else{
                    alert("사용할 수 없는 계정입니다. 관리자에게 문의해 주세요.");
                    return;
                }
            },
            error: function (x,h,r){
                alert("시스템 에러 발생. 관리자에게 문의해 주세요.");
                return;
            }
        })
    },
    signUp : function (){
        let adminId = $("#adminId").val();
        let adminPassword = $("#adminPassword").val();
        let adminName = $("#adminName").val();
        let adminEmail = $("#adminEmail").val();
        let adminAuth = $(':radio[name="inputAuth"]:checked').val();


        /*if(sendvalidNun == '' || sendvalidNun == undefined){
            alert("인증 번호 전송 버튼을 클릭 후 전송된 인증 번호를 입력해 주세요.");
            return;
        }

        if(userValidNum == '' || userValidNum == undefined){
            alert("인증번호를 입력해 주세요.");
            $("#validation").focus();
            return;
        }

        if(sendvalidNun != userValidNum){
            alert("인증번호가 일치하지 않습니다. 확인 후 다시 시도해 주세요.");
            return;
        }*/

        //TODO : ID, Password 유효성 검사
        // ID : 영문(대소문) + 숫자 조합 || PWD : 영문 + 숫자 + 특수문자 조합
        /*if(!this.idValication(userId)){
            return false;
        }
        if(!this.pwdValidation(userPwd)){
            return false;
        }*/

        let data = {
            adminId : adminId,
            adminPassword : adminPassword,
            adminName : adminName,
            adminEmail : adminEmail,
            adminRule : adminAuth
        }
        $.ajax({
            url : "/signUp",
            method : "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data : JSON.stringify(data),
            success : function (result){

                if(result != null && result == 1){
                    alert("계정 생성에 성공하였습니다.");
                    location.href = "/login";
                }else{
                    alert("계정 생성에 실패하였습니다.");
                    return;
                }
            },
            error : function (x,h,r){
                alert("시스템 에러 발생. 지속적인 오류 발생 시 관리자에게 문의해 주세요");
            }
        });
    },
    pwdValidation : function (pwd){
        // 비밀번호 규칙 : 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 16자리 이하 입력
        let reg = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/;
        if(!reg.test(pwd)){
            alert(" 비밀번호는 하나 이상의 문자,숫자,특수문자 조합으로 구성됩니다. (최소8 ~ 최대16글자)");
            return false;
        }else{
            return true;
        }

    },
    idValication : function (id){
        let reg = /^[a-z]+[a-z0-9]{5,19}$/;
        if(!reg.test(id)){
            alert("아이디는 숫자와 영문의 조합으로만 가능합니다. (5자 이상 19자 이내)");
            return false;
        }else{
            return true;
        }
    },


}

main.init();