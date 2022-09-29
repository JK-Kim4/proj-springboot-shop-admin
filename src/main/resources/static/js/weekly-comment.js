let main = {
    init : function (){

        let _this = this;

        /*저자 검색 버튼*/
        $("#searchAuthBtn").on("click", function (){
            let keyword = $("#searchAuthNm").val();
            _this.searchAuthor(keyword, 1, 10);
        });

        /*저자 초기화 버튼*/
        $("#resetAuth").on("click",function (){
            $("#inputAuthSearch").children().remove();
            authCnt = 0;
        });

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
                        "           id='"+item.authorId+"' " +
                        "           name='searchAuthResultNm' " +
                        "           value='"+ item.authorId+ "'" +
                        "           autoKrNm = '"+item.authorKrNm+"'" +
                        ">" +
                        "<label for='"+item.authorId+"'>"+item.authorKrNm+"</label></td>" +
                        "<td><span>"+item.authorChNm+"</span></td>";
                });
                $("#searchAuthResult").html(html);

            },
            error : function (x,h,r){
                console.log(x);
                alert("시스템 에러 발생. 지속적인 오류 발생 시 관리자에게 문의해 주세요");
            }
        });

    },

};


main.init();