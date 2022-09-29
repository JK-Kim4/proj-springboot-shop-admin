let main = {

    init : function(){

        let _this = this;

        /*이미지 업로드*/
        $("#uploadBtn").on("click", function (){
            $('#loading').show();
            _this.upload();
        })

        /*저자 등록*/
        $("#authorInsertBtn").on("click", function (){
            _this.insert();
        })

        /*저자 수정*/
        $("#authorUpdateBtn").on("click", function (){
            _this.update();
        })

        /*저자 삭제*/
        $("#authorDeleteBtn").on("click", function (){
            _this.delete();
        });

        /*저자 검색*/
        $("#searchBtn").on('click', function (){
            let keyword = $("#searchKeyword").val();
            if(keyword == '' || keyword == undefined){
                alert("검색어를 입력해 주세요.");
                return;
            }
            _this.getAuthorListByKeyword(keyword, 1, 10);
        });

    },
    insert : function (){

        //TODO : 필수 데이터 검증
        let krName = $("#inputKrNm").val();
        let useYn = $(':radio[name="inputYn"]:checked').val();
        let content = $("#inputContent").val();

        if(krName == '' || krName == null || krName == undefined){
            alert("저자 이름을 입력해 주세요");
            return;
        }

        let data = {
            authorKrName : krName,
            useYn : useYn,
            authorContent : content
        }

        data.authorThumbnailImage = $("#authorImgFileUrl").val();
        data.authorThumbnailImageFileName = $("#authorThumbnailImageFileName").val();

        $.ajax({
            url : "/author/insert",
            method : "POST",
            contentType: 'application/json; charset=utf-8',
            data : JSON.stringify(data),
            success : function (result){

                if(result > 0){
                    alert("등록이 완료되었습니다.");
                    location.href = "/author/list";
                }else{
                    alert("등록에 실패하였습니다. 다시 시도하여 주세요.");
                    location.reload();
                }

            },
            error : function (x, h, r){
                alert("시스템 에러 발생. 지속적인 오류 발생 시 관리자에게 문의해 주세요");
                location.reload();
            }
        });

    },
    update : function (){

        //TODO : 필수 데이터 검증
        let authorSeq = $("#authorSeq").val();
        let krName = $("#inputKrNm").val();
        let useYn = $(':radio[name="inputYn"]:checked').val();
        let content = $("#inputContent").val();

        if(krName == '' || krName == null || krName == undefined){
            alert("저자 이름을 입력해 주세요");
            return;
        }


        let data = {
            authorKrName : krName,
            useYn : useYn,
            authorContent : content
        }

        data.authorThumbnailImage = $("#authorImgFileUrl").val();
        data.authorThumbnailImageFileName = $("#authorThumbnailImageFileName").val();

        $.ajax({
            url : "/author/update/"+authorSeq,
            method : "POST",
            contentType: 'application/json; charset=utf-8',
            data : JSON.stringify(data),
            success : function (result){
                if(result > 0){
                    alert("수정이 완료되었습니다.");
                    location.reload();
                }else{
                    alert("수정에 실패하였습니다. 다시 시도하여 주세요.");
                    location.reload();
                }

            },
            error : function (x, h, r){
                alert("시스템 에러 발생. 지속적인 오류 발생 시 관리자에게 문의해 주세요");
                location.reload();
            }
        });
    },
    delete : function (){
        let authorSeq = $("#authorSeq").val();

        $.ajax({
            url : "/author/delete/"+authorSeq,
            method : "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success : function (result){


                if(result > 0){
                    alert("저자정보가 삭제되었습니다.");
                    location.href = "/author/list";

                }else{
                    alert("삭제에 실패하였습니다. 다시 시도하여 주세요.");
                    location.reload();
                }

            },
            error : function (x, h, r){
                alert("시스템 에러 발생. 지속적인 오류 발생 시 관리자에게 문의해 주세요");
                location.reload();
            }
        });
    },
    upload : function (){

        let inputFile = $("#inputFile")[0].files[0];
        let formData = new FormData();
        let html = "";

        if(inputFile == null || inputFile == undefined){
            alert("업로드할 파일을 선택해 주세요");
            return;
        }

        new Compressor(inputFile, {
            quality: 0.8,
            convertSize : 5000000,
            success : function (result){
                formData.append("files", new File([result], inputFile.name));

                $.ajax({
                    type : "POST",
                    url : "/file/upload/image",
                    enctype : "multipart/form-data",
                    data : formData,
                    processData: false,
                    contentType: false,
                    cache: false,
                    success : function (data){

                        if(data.resultCd = '0000'){
                            alert("파일 업로드 성공 : " + data.resultMsg);

                            $('#loading').hide();
                            $("#uploadImgBtn").hide();
                            $("#authorThumbnailImage").val(data.resultMsg);
                            $("#authorThumbnailImageFileName").val(data.orgFileNm);
                            $("#uploadValid").val("Y");
                            html += "<img src='" + data.resultMsg + "' alt='uploadImage' style='max-width: 150px;'>";
                            $("#imgControl").html(html);
                        }else{
                            alert("파일 업로드 실패, 다시 시도해 주세요.");
                            $("#uploadValid").val("N");
                            $("#authorThumbnailImage").val("");
                            $("#authorThumbnailImageFileName").val("");
                        }
                    },
                    error : function (data){
                        alert("시스템 에러 발생. 지속적인 오류 발생 시 관리자에게 문의해 주세요");
                        $("#uploadValid").val("N");
                        $("#authorThumbnailImage").val("");
                        $("#authorThumbnailImageFileName").val("");
                    }
                });
            },
            error : function (){
                console.log('resize error');
                return;
            }
        });
    },
    getAuthorList : function (pageNum, pageSize){

        $.ajax({
            url : "/author/authors",
            type : "POST",
            dataType : "json",
            data : {
                pageNum : pageNum,
                pageSize : pageSize
            },
            success : function (result){

                console.log("저자 데이터 조회 성공 " + result)

                let html = "";

                if(result.list.length > 0){
                    /*저자 데이터*/
                    html = main.drawAuthorListData(result.list);
                }else{
                    html = "<tr><td colspan='5' style='text-align: center;'> 등록된 저자가 없습니다.</td></tr>"
                }

                $("#authorList").html(html);
                html = "";

                /*pagination*/
                if(result.prePage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Previous</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getAuthorList("+result.prePage+", 10)'>Previous</a></li>"
                }

                if(result.navigatepageNums.length > 0){
                    for(let i = result.navigateFirstPage; i <= result.navigateLastPage; i++){
                        if(result.pageNum == i){
                            html += "<li class='page-item active'><a class='page-link' onclick='main.getAuthorList("+i+", 10)'>"+i+"</a></li>"
                        }else{
                            html += "<li class='page-item'><a class='page-link' onclick='main.getAuthorList("+i+", 10)'>"+i+"</a></li>"
                        }
                    }
                }
                if(result.nextPage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Next</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getAuthorList("+result.nextPage+", 10)'>Next</a></li>"
                }

                $("#pagingNav").html(html);

            },
            error : function (x,h,r){
                console.log(x);
            }
        });
    },
    drawAuthorListData : function (data){
        let html = "";
        $.each(data, function (index, item){
            html += "<tr>" +
                "<td class='col-md-1'>"+item.authorSeq+"</td>" +
                "<td class='col-md-1'><a href='/author/update/"+item.authorSeq+"'>"+item.authorKrName+"</a></td>" +
                "<td class='col-md-1'>"+item.useYn+"</td>" +
                "<td class='col-md-1'>"+item.appendDate+"</td>" +
                "<td class='col-md-1'>"+item.updateDate+"</td>" +
                "</tr>";
        });

        return html;
    },
    getAuthorListByKeyword : function (keyword, pageN, pageS){
        $.ajax({
            url : "/author/search/" +keyword,
            method : "POST",
            dataType: "json",
            data : {
                pageNum : pageN,
                pageSize : pageS
            },
            success : function (result){

                let html = main.drawAuthorListData(result.list);
                $("#authorList").html(html);
                html = "";
                if(result.prePage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Previous</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getAuthorListByKeyword("+'"'+keyword+'"'+","+result.prePage+", 10)'>Previous</a></li>"
                }

                if(result.navigatepageNums.length > 0){
                    for(let i = result.navigateFirstPage; i <= result.navigateLastPage; i++){
                        if(result.pageNum == i){
                            html += "<li class='page-item active'><a class='page-link' onclick='main.getAuthorListByKeyword("+'"'+keyword+'"'+","+i+", 10)'>"+i+"</a></li>"
                        }else{
                            html += "<li class='page-item'><a class='page-link' onclick='main.getAuthorListByKeyword("+'"'+keyword+'"'+","+i+", 10)'>"+i+"</a></li>"
                        }
                    }
                }
                if(result.nextPage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Next</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getAuthorListByKeyword("+'"'+keyword+'"'+","+result.nextPage+", 10)'>Next</a></li>"
                }

                $("#pagingNav").html(html);
            },
            error : function (x,h,r){
                console.log(x);
            }
        });
    }

}

main.init();