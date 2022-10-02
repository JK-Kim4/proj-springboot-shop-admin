let main = {

    init:function (){
        let _this = this;

        /*등록*/
        $("#articleInsertBtn").on("click", function (){

        });

        /*수정*/
        $("#articleUpdateBtn").on("click", function (){

        });

        /*삭제*/
        $("#articleDeleteBtn").on("click", function (){

        });

        /*호수 선택 시*/
        $("#inputVolume").on("change", function (){
            let magazineSeq = $("#inputVolume").val();
            _this.getArticleHeadList(magazineSeq);
        });

        /*저자 검색 버튼*/
        $("#searchAuthBtn").on("click", function (){
            let keyword = $("#searchAuthNm").val();
            _this.searchAuthor(keyword, 1, 10);
        });

        /*저자 입력 버튼*/
        $("#authRegBtn").on("click", function (){
            _this.authTempSave();

            _this.modalHide("searchAuthModal");
        });

    },
    getArticleList : function (pageNum, pageSize){


    },
    searchAuthor : function (keyword, pageNum, pageSize){

        if(keyword == '' || keyword == undefined){
            alert("작가 이름을 입력해 주세요.")
            return;
        }

        $.ajax({
            url : "/author/search/" + keyword,
            method : "POST",
            dataType: 'json',
            data : {
                pageNum : pageNum,
                pageSize : pageSize
            },
            success : function (result) {

                $("#searchAuthResult").empty();
                let html = "";
                $.each(result.list, function (index, item) {
                    html += "<tr><td>" +
                        "<input type='radio' " +
                        "           id='"+item.authorSeq+"' " +
                        "           name='searchAuthResultNm' " +
                        "           value='"+ item.authorSeq+ "'" +
                        "           autoKrNm = '"+item.authorKrName+"'" +
                        ">" +
                        "<label for='"+item.authorSeq+"'>"+item.authorKrName+"</label></td>" +
                        "<td><span>";
                    if(item.authorChName != null) html += item.authorChName;
                    else html += "-";
                    html += "</span></td>";
                });
                $("#searchAuthResult").html(html);

            },
            error : function (x,h,r){
                console.log(x);
                alert("시스템 에러 발생. 지속적인 오류 발생 시 관리자에게 문의해 주세요");
            }
        });

    },
    authTempSave : function (){
        let html = "";
        let authKrNm = $(":input:radio[name=searchAuthResultNm]:checked").attr("autoKrNm");
        let authSeq = $(":input:radio[name=searchAuthResultNm]:checked").val();

        if(authSeq == null || authSeq == undefined){
            alert("저자를 선택해 주세요.");
            return;
        }

        html += "<span> " +authKrNm+ ", " + "</span>" +
            "<input type='hidden' id='inputCode"+(authCnt+1)+"_01' value='"+authSeq+"'>";

        authCnt++;
        $("#inputAuthSearch").append(html);
    },
    modalHide : function (modalId){
        $("#"+modalId).removeClass("in");
        $(".modal-backdrop").remove();
        $('body').removeClass('modal-open');
        $('body').css('padding-right', '');
        $("#"+modalId).hide();
    },
    getArticleHeadList : function (magazineSeq){
        $.ajax({
            url: "/article/head/"+magazineSeq,
            method: "GET",
            contentType: 'application/json; charset=utf-8',
            success: function (result){
                if(result != null && result.length > 0){


                }else{
                    alert("등록된 헤드 타이틀이 없습니다.");
                    return;
                }

            },
            error : function (x, h, r){
                console.log(x);
                alert("시스템 오류 발생. 관리자에게 문의해 주세요");
                return;
            }
        })

    }
}

main.init();