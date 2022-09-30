let main = {
    init : function (){

        let _this = this;

        /*등록*/
        $("#weeklyInsertBtn").on("click", function (){
            _this.insert();
        });

        /*수정*/
        $("#weeklyUpdateBtn").on("click", function (){
                _this.update();
        });

        /*삭제*/
        $("#weeklyDeleteBtn").on("click", function (){
            _this.delete();
        });

        /*검색*/
        $("#searchBtn").on('click', function (){
            let keyword = $("#searchKeyword").val();
            if(keyword == '' || keyword == undefined){
                alert("검색어를 입력해 주세요.");
                return;
            }
            _this.getWeeklyListByKeyword(keyword, 1, 10);

        });


        /*이미지 업로드*/
        $("#uploadBtn").on("click", function (){
            $('#loading').show();
            _this.upload();
        })

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
                            $("#weeklyThumbnailImage").val(data.resultMsg);
                            $("#weeklyThumbnailImageFileName").val(data.orgFileNm);
                            $("#uploadValid").val("Y");
                            html += "<img src='" + data.resultMsg + "' alt='uploadImage' style='max-width: 150px;'>";
                            $("#imgControl").html(html);
                        }else{
                            alert("파일 업로드 실패, 다시 시도해 주세요.");
                            $("#uploadValid").val("N");
                            $("#weeklyThumbnailImage").val("");
                            $("#weeklyThumbnailImageFileName").val("");
                        }
                    },
                    error : function (data){
                        alert("시스템 에러 발생. 지속적인 오류 발생 시 관리자에게 문의해 주세요");
                        $("#uploadValid").val("N");
                        $("#weeklyThumbnailImage").val("");
                        $("#weeklyThumbnailImageFileName").val("");
                    }
                });
            },
            error : function (){
                console.log('resize error');
                return;
            }
        });
    },
    insert : function (){
        //입력값
        //사용여부
        let useYn = $(":radio[name=inputUseYn]:checked").val();
        //주간논평 제목
        let title = $("#inputTitle").val();
        let subtitle = $("#inputSubtitle").val();
        //주간논평 본문
        let content = CKEDITOR.instances['inputContent'].getData();
        //섬네일 이미지
        let weeklyThumbnailImage = $("#weeklyThumbnailImage").val();
        let weeklyThumbnailImageFileName = $("#weeklyThumbnailImageFileName").val();

        /*입력 데이터 검증*/
        if(title == '' || title == undefined){
            alert("본문 제목을 입력해 주세요. (필수 항목)");
            $("#inputTitle").focus();
            return;
        }else if(content == '' || content == undefined){
            alert("내용을 입력해 주세요. (필수 항목)");
            $("#inputContent").focus();
            return;
        };

        let data = {
            useYn : useYn,
            weeklyTitle : title,
            weeklySubtitle: subtitle,
            weeklyContent : content,
            weeklyThumbnailImage : weeklyThumbnailImage,
            weeklyThumbnailImageFileName : weeklyThumbnailImageFileName
        };

        //저자 List
        if(authCnt > 0){
            let authArray = [];
            for(let i = 1; i <= authCnt; i ++ ){
                if($("#inputCode"+i+"_01").val() != undefined){
                    authArray.push({authorSeq : $("#inputCode"+i+"_01").val(), weeklySeq : 0});
                }
            }
            data.authArray = authArray;
        };

        $.ajax({
            url : "/weeklyComment/insert",
            method : "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data : JSON.stringify(data),
            success : function (result){

                if(result > 0){
                    alert("주간논평 등록 완료");
                    location.href = "/weeklyComment/list";
                }else{
                    alert("주간논평 등록 실패");
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

        let weeklySeq = $("#selectedWeeklySeq").val();
        if(weeklySeq == '' || weeklySeq == null || weeklySeq == undefined) {
            alert("시스템 오류 발생. 관리자에게 문의해 주세요.");
            return;
        }
        //입력값
        //사용여부
        let useYn = $(":radio[name=inputUseYn]:checked").val();
        //주간논평 제목
        let title = $("#inputTitle").val();
        let subtitle = $("#inputSubtitle").val();
        //주간논평 본문
        let content = CKEDITOR.instances['inputContent'].getData();
        //섬네일 이미지
        let weeklyThumbnailImage = $("#weeklyThumbnailImage").val();
        let weeklyThumbnailImageFileName = $("#weeklyThumbnailImageFileName").val();

        /*입력 데이터 검증*/
        if(title == '' || title == undefined){
            alert("본문 제목을 입력해 주세요. (필수 항목)");
            $("#inputTitle").focus();
            return;
        }else if(content == '' || content == undefined){
            alert("내용을 입력해 주세요. (필수 항목)");
            $("#inputContent").focus();
            return;
        };

        let data = {
            useYn : useYn,
            weeklyTitle : title,
            weeklySubtitle: subtitle,
            weeklyContent : content,
            weeklyThumbnailImage : weeklyThumbnailImage,
            weeklyThumbnailImageFileName : weeklyThumbnailImageFileName
        };

        //저자 List
        if(authCnt > 0){
            let authArray = [];
            for(let i = 1; i <= authCnt; i ++ ){
                if($("#inputCode"+i+"_01").val() != undefined){
                    authArray.push({authorSeq : $("#inputCode"+i+"_01").val(), weeklySeq : 0});
                }
            }
            data.authArray = authArray;
        };

        $.ajax({
            url : "/weeklyComment/update/"+weeklySeq,
            method : "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data : JSON.stringify(data),
            success : function (result){

                if(result > 0){
                    alert("주간논평 수정 완료");
                    location.reload();
                }else{
                    alert("수정에 실패하였습니다. 다시 시도해주세요.");
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

        let weeklySeq = $("#selectedWeeklySeq").val();
        if(weeklySeq == '' || weeklySeq == null || weeklySeq == undefined){
            alert("시스템 오류 발생. 관리자에게 문의해 주세요.");
            return;
        }

        $.ajax({
            url : "/weeklyComment/delete/"+weeklySeq,
            method : "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success : function (result){

                if(result > 0){
                    alert("주간논평 삭제 완료");
                    location.href = "/weeklyComment/list"
                }else{
                    alert("삭제에 실패하였습니다. 다시 시도해 주세요");
                    location.reload();
                }

            },
            error : function (x, h, r){
                alert("시스템 에러 발생. 지속적인 오류 발생 시 관리자에게 문의해 주세요");
                location.reload();
            }
        });
    },
    getWeeklyList : function (pageNum, pageSize){

        $.ajax({
            url : "/weeklyComment/weeklyComments",
            method : "POST",
            dataType : "json",
            data : {
                pageNum : pageNum,
                pageSize : pageSize
            },
            success : function (result){
                let html = "";
                if(result.list.length > 0){
                    html = main.drawWeeklyList(result.list);
                }else{
                    html = "<tr><td colspan='4' style='text-align: center;'> 등록된 주간논평이 없습니다.</td></tr>"
                }

                $("#weeklyCommentList").html(html);

                html = "";

                /*pagination*/
                if(result.prePage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Previous</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getWeeklyList("+result.prePage+", 10)'>Previous</a></li>"
                }

                if(result.navigatepageNums.length > 0){
                    for(let i = result.navigateFirstPage; i <= result.navigateLastPage; i++){
                        if(result.pageNum == i){
                            html += "<li class='page-item active'><a class='page-link' onclick='main.getWeeklyList("+i+", 10)'>"+i+"</a></li>"
                        }else{
                            html += "<li class='page-item'><a class='page-link' onclick='main.getWeeklyList("+i+", 10)'>"+i+"</a></li>"
                        }
                    }
                }
                if(result.nextPage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Next</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getWeeklyList("+result.nextPage+", 10)'>Next</a></li>"
                }
                $("#pagingNav").html(html);
            },
            error : function (x, h, r){
                console.log(x);
            }
        });
    },
    drawWeeklyList : function (data){
        let html = "";
        $.each(data, function (index, item){
            html += "<tr>" +
                "<td class='col-md-1'>"+item.weeklySeq+"</td>" +
                "<td class='col-md-4'><a href='/weeklyComment/update/"+item.weeklySeq+"'>"+item.weeklyTitle+"</a></td>" +
                "<td class='col-md-1'>"+item.useYn+"</td>" +
                "<td class='col-md-1'>"+item.appendDate+"</td>" +
                "<td class='col-md-1'>"+item.updateDate+"</td>" +
                "<td class='col-md-1'>"+item.viewCount+"</td>" +
                "</tr>";
        });
        return html;
    },
    getWeeklyListByKeyword : function (keyword, pageNum, pageSize){
        $.ajax({
            url : "/book/search/" +keyword,
            method : "POST",
            dataType: "json",
            data : {
                pageNum : pageNum,
                pageSize : pageSize
            },
            success : function (result){

                let html = main.drawWeeklyList(result.list);
                $("#weeklyCommentList").html(html);

                html = "";
                if(result.prePage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Previous</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getWeeklyListByKeyword("+'"'+keyword+'"'+","+result.prePage+", 10)'>Previous</a></li>"
                }

                if(result.navigatepageNums.length > 0){
                    for(let i = result.navigateFirstPage; i <= result.navigateLastPage; i++){
                        if(result.pageNum == i){
                            html += "<li class='page-item active'><a class='page-link' onclick='main.getWeeklyListByKeyword("+'"'+keyword+'"'+","+i+", 10)'>"+i+"</a></li>"
                        }else{
                            html += "<li class='page-item'><a class='page-link' onclick='main.getWeeklyListByKeyword("+'"'+keyword+'"'+","+i+", 10)'>"+i+"</a></li>"
                        }
                    }
                }
                if(result.nextPage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Next</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getWeeklyListByKeyword("+'"'+keyword+'"'+","+result.nextPage+", 10)'>Next</a></li>"
                }

                $("#pagingNav").html(html);
            },
            error : function (x,h,r){
                console.log(x);
            }
        });
    },
    getWeeklyData : function (weeklySeq){
        $.ajax({
            url : "/weeklyComment/"+weeklySeq,
            method : "GET",
            dataType: 'json',
            success : function (result){

                $("#inputTitle").val(result.weeklyTitle);
                $("#inputSubtitle").val(result.weeklySubtitle);
                //content
                $("#inputContent").val(result.weeklyContent);
                //useYn
                if(result.useYn == 1){
                    $("#useY").prop("checked", true);
                }else{
                    $("#useN").prop("checked", true);
                }


                $("#weeklyThumbnailImage").val(result.weeklyThumbnailImage);
                $("#weeklyThumbnailImageFileName").val(result.weeklyThumbnailImageFileName);

                $("#uploadedImg").val('업로드 자료 : ' +result.weeklyThumbnailImageFileName);

            },
            error : function (x,h,r){
                console.log(x);
            }
        });
    },
    getAuthData : function (weeklySeq){
        $.ajax({
            url : "/weeklyComment/authorMeta/"+weeklySeq,
            method : "GET",
            dataType: "json",
            success : function (result){

                console.log(result);

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
};


main.init();