let main = {

    init:function (){
        let _this = this;

        /*등록*/
        $("#articleInsertBtn").on("click", function (){
            _this.insert();
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

        /*검색*/
        $("#searchBtn").on('click', function (){
            let keyword = $("#searchKeyword").val();
            if(keyword == '' || keyword == undefined){
                alert("검색어를 입력해 주세요.");
                return;
            }
            _this.getArticleListByKeyword(keyword, 1, 10);
        });

    },
    insert : function () {
        //입력 데이터
        let title = $("#inputTitle").val();
        let useYn = $(":radio[name=inputUseYn]:checked").val();
        let content = CKEDITOR.instances['inputContent'].getData();
        let magazineSeq = $("#inputVolume").val();
        let articleHeadSeq = $("#inputHeadTitle").val();
        let ebookPage = $("#inputEbookPage").val();
        let ordered = $("#inputOrdered").val();

        //TODO input data validation


        let data = {
            articleTitle: title,
            articleContent: content,
            useYn: useYn,
            magazineSeq: magazineSeq,
            articleHeadSeq: articleHeadSeq,
            ebookPage: ebookPage,
            ordered : ordered
        }

        //저자 List
        if(authCnt > 0){
            let authArray = [];
            for(let i = 1; i <= authCnt; i ++ ){
                if($("#inputCode"+i+"_01").val() != undefined){
                    authArray.push({authorSeq : $("#inputCode"+i+"_01").val(), articleSeq : 0});
                }
            }
            data.authArray = authArray;
        };

        $.ajax({
            url: "/article/insert",
            method: "POST",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            data : JSON.stringify(data),
            success : function (result){
                if(result != null && result > 0){
                    console.log(result);

                }else{
                    alert("아티클 등록 실패");
                    return;
                }

            },
            error : function (x, h, r){
                alert("시스템 에러 발생. 관리자에게 문의해 주세요");
                return;
            }

        })


    }
    ,
    update : function (){
        let articleSeq = $("#articleSeq").val();
        let title = $("#inputTitle").val();
        let useYn = $(":radio[name=inputUseYn]:checked").val();
        let content = CKEDITOR.instances['inputContent'].getData();
        let magazineSeq = $("#inputVolume").val();
        let articleHeadSeq = $("#inputHeadTitle").val();
        let ebookPage = $("#inputEbookPage").val();
        let ordered = $("#inputOrdered").val();

        let data = {
            articleTitle: title,
            articleContent: content,
            useYn: useYn,
            magazineSeq: magazineSeq,
            articleHeadSeq: articleHeadSeq,
            ebookPage: ebookPage,
            ordered : ordered
        };

        //저자 List
        if(authCnt > 0){
            let authArray = [];
            for(let i = 1; i <= authCnt; i ++ ){
                if($("#inputCode"+i+"_01").val() != undefined){
                    authArray.push({authorSeq : $("#inputCode"+i+"_01").val(), articleSeq : 0});
                }
            }
            data.authArray = authArray;
        };


        $.ajax({
            url: "/article/update/"+articleSeq,
            method: "POST",
            dataType: "json",
            data: data,
            success: function (result){
               if(result > 0){
                   alert("아티클 수정 성공");
                   location.reload();
               }else{
                   alert("아티클 수정 실패");
                   location.reload();
               }
            },
            error: function (x,h,r){
               alert("시스템 오류 발생. 관리자에게 문의해 주세요");
               return;
            }

        });

    },
    delete : function (){
        let articleSeq = $("#articleSeq").val();

        $.ajax({
            url: "/article/delete/"+articleSeq,
            method: "DELETE",
            success: function (result){
                if(result > 0){
                    alert("아티클 삭제 성공");
                    location.href = "/article/list";
                }else{
                    alert("아티클 삭제 실패");
                    location.reload();
                }
            },
            error : function (x,h,r){
                alert("시스템 에러 발생. 관리자에게 문의해 주세요");
                return;
            }
        });
    },
    getArticleList : function (pageNum, pageSize){
        $.ajax({
            url: "/article/articles",
            method: "GET",
            dataType: "json",
            data : {
                pageNum : pageNum,
                pageSize : pageSize
            },
            success: function (result){
                let html = "";
                if(result.list.length > 0){
                    html = main.drawArticleList(result.list);
                }else{
                    html = "<tr><td colspan='7' style='text-align: center;'> 등록된 아티클이 없습니다.</td></tr>"
                }

                $("#articleList").html(html);

                html = "";

                /*pagination*/
                if(result.prePage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Previous</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getArticleList("+result.prePage+", 10)'>Previous</a></li>"
                }

                if(result.navigatepageNums.length > 0){
                    for(let i = result.navigateFirstPage; i <= result.navigateLastPage; i++){
                        if(result.pageNum == i){
                            html += "<li class='page-item active'><a class='page-link' onclick='main.getArticleList("+i+", 10)'>"+i+"</a></li>"
                        }else{
                            html += "<li class='page-item'><a class='page-link' onclick='main.getArticleList("+i+", 10)'>"+i+"</a></li>"
                        }
                    }
                }
                if(result.nextPage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Next</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getArticleList("+result.nextPage+", 10)'>Next</a></li>"
                }
                $("#pagingNav").html(html);
            },
            error : function (x, h, r){
                alert("시스템 오류 발생. 관리자에게 문의해 주세요.");
                return;
            }

        });

    },
    drawArticleList : function (data){
        let html = "";
        $.each(data, function (index, item){
            html += "<tr>" +
                "<td class='col-md-1'>"+item.articleSeq+"</td>" +
                "<td class='col-md-1'>"+item.magazineVolume+"</td>" +
                "<td class='col-md-4'><a href='/article/update/"+item.articleSeq+"'>"+item.articleTitle+"</a></td>" +
                "<td class='col-md-1'>"+item.useYn+"</td>" +
                "<td class='col-md-1'>"+item.appendDate+"</td>" +
                "<td class='col-md-1'>"+item.updateDate+"</td>" +
                "<td class='col-md-1'>"+item.viewCount+"</td>" +
                "</tr>"
        });
        return html;
    },
    getArticleListByKeyword : function (keyword, pageNum, pageSize){
        $.ajax({
            url : "/article/search/" +keyword,
            method : "POST",
            dataType: "json",
            data : {
                pageNum : pageNum,
                pageSize : pageSize
            },
            success : function (result){

                let html = main.drawArticleList(result.list);
                $("#articleList").html(html);

                html = "";
                if(result.prePage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Previous</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getArticleListByKeyword("+'"'+keyword+'"'+","+result.prePage+", 10)'>Previous</a></li>"
                }

                if(result.navigatepageNums.length > 0){
                    for(let i = result.navigateFirstPage; i <= result.navigateLastPage; i++){
                        if(result.pageNum == i){
                            html += "<li class='page-item active'><a class='page-link' onclick='main.getArticleListByKeyword("+'"'+keyword+'"'+","+i+", 10)'>"+i+"</a></li>"
                        }else{
                            html += "<li class='page-item'><a class='page-link' onclick='main.getArticleListByKeyword("+'"'+keyword+'"'+","+i+", 10)'>"+i+"</a></li>"
                        }
                    }
                }
                if(result.nextPage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Next</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getArticleListByKeyword("+'"'+keyword+'"'+","+result.nextPage+", 10)'>Next</a></li>"
                }

                $("#pagingNav").html(html);
            },
            error : function (x,h,r){
                console.log(x);
            }
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
                let html = "";
                if(result != null && result.length > 0){
                    $.each(result, function (index, item){
                       html += "<option value='"+item.articleHeadSeq+"'>"+item.articleHeadTitle+"</option>"
                    });

                    $("#inputHeadTitle").html(html);
                    console.log(result);
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

    },
    getArticleData: function (articleSeq){
        $.ajax({
            url: "/article/"+articleSeq,
            method: "GET",
            contentType: 'application/json; charset=utf-8',
            success : function (result){

                $("#inputTitle").val(result.articleTitle);
                //content
                $("#inputContent").val(result.articleContent);
                //useYn
                if(result.useYn == 1){
                    $("#useY").prop("checked", true);
                }else{
                    $("#useN").prop("checked", true);
                }

                $("#inputEbookPage").val(result.ebookPage);
                $("#inputOrdered").val(result.ordered);
                $("#inputVolume").val(result.magazineSeq).attr("selected", "selected");
                if(main.getArticleHeadList(result.magazineSeq)){
                    $("#inputHeadTitle").val(result.articleHeadSeq).attr("selected", "selected");
                }

            },
            error : function (x,h,r){
                alert("시스템 에러 발생. 관리자에게 문의해 주세요.");
                return;
            }

        })

    },
    getArticleAuthData : function (articleSeq){
        $.ajax({
            url : "/article/authorMeta/"+articleSeq,
            method : "GET",
            dataType: "json",
            success : function (result){
                let html = "";
                if(result != null && result.length > 0){
                    authCnt = result.length;
                    result.forEach((element,index) => {
                        $("#inputAuthSearch").append("<span>"+element.authorKrName+", </span>");
                        html += "<input type='hidden' id='inputCode"+(index+1)+"_01' value='"+element.authorSeq+"'>";
                    });
                    $("#inputAuthSearch").append(html);
                }
            },
            error : function (x,h,r){
                console.log(x);
                alert("시스템 에러 발생 : 저자 조회");
            }
        });

    }
}

main.init();