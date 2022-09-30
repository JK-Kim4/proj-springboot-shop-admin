main = {
    init : function (){
        let _this = this;

        /*등록*/
        $("#magazineInsertBtn").on("click", function (){
           _this.insert();
        });

        /*검색*/
        $("#searchBtn").on('click', function (){
            let keyword = $("#searchKeyword").val();
            let category = $("#searchCategory").val();
            if(keyword == '' || keyword == undefined){
                alert("검색어를 입력해 주세요.");
                return;
            }
            _this.getMagazineListByKeyword(keyword, category,1, 10);

        });

        /*파일업로드*/
        $("#uploadBtn").on("click", function (){
            $('#loading').show();
            _this.upload();
        });

        /*기사 헤드 타이틀 추가*/
        $("#addArticleHeadBtn").on("click", function (){
            let html = "";
            ++articleCnt;
            html +=     "<div id='articleHead"+(articleCnt)+"' class='row'>" +
                            "<span>"+articleCnt +". </span>" +
                            "<div class='col-8'>" +
                                "<input  class='form-control' type='text' id='inputArticleHead"+(articleCnt)+"_01' placeholder='헤드 타이틀을 입력해 주세요'>" +
                            "</div>" +
                            "<div class='col-2'>" +
                                "<input class='form-control' type='number' id='inputArticleHead"+(articleCnt)+"_02' placeholder='노출 순서 설정'>"+
                            "</div>" +
                            "<div class='col-2'>"+
                                "<button type='button' class='btn btn-danger articleHeadRemoveBtn' data-cnt='"+(articleCnt)+"' style='max-height: 35px;' >삭제</button>" +
                            "</div>" +
                        "</div>";

            $("#articleHeadDiv").append(html);

            $(".articleHeadRemoveBtn").off().on("click", function (){
                $("#articleHead"+$(this).attr("data-cnt")).remove();
                /*$(this).prev().prev().remove(); // remove the textbox
                $(this).remove(); // remove the button*/
                $(this).remove();
                articleCnt--;
            });

        });

    },
    insert : function (){
        //입력값
        //사용여부
        let useYn = $(":radio[name=inputUseYn]:checked").val();
        //주간논평 제목
        let title = $("#inputTitle").val();
        let category = $("select[name=inputCategory] option:selected").val();
        let year = $("select[name=inputYear] option:selected").val();
        let season= $("select[name=inputSeason] option:selected").val();
        let volume = $("#inputVolume").val();
        //주간논평 본문
        let content = CKEDITOR.instances['inputContent'].getData();
        //섬네일 이미지
        let magazineThumbnailImage = $("#magazineThumbnailImage").val();
        let magazineThumbnailImageFileName = $("#magazineThumbnailImageFileName").val();

        /*입력 데이터 검증*/
        if(title == '' || title == undefined){
            alert("본문 제목을 입력해 주세요. (필수 항목)");
            $("#inputTitle").focus();
            return;
        }else if(content == '' || content == undefined){
            alert("내용을 입력해 주세요. (필수 항목)");
            $("#inputContent").focus();
            return;
        }else if((year == '' || year == undefined) ||
                    (season == '' || season == undefined) ||
                        (volume == '' || volume == undefined)){
            alert("계간지 발간 정보를 입력해 주세요.");
            $("select[name=inputYear]").focus();
            return;
        };

        let data = {
            useYn : useYn,
            magazineTitle : title,
            magazineCategorySeq : category,
            magazineContent : content,
            magazineVolume : volume,
            magazineYear : year,
            magazineSeason : season,
            magazineThumbnailImage : magazineThumbnailImage,
            magazineThumbnailImageFileName : magazineThumbnailImageFileName
        };

        //헤드 타이틀 List
        if(articleCnt > 0){
            let articleHeadArray = [];
            for(let i = 1; i <= articleCnt; i ++ ){
                if($("#inputArticleHead"+i+"_01").val() != undefined){
                    if($("#inputArticleHead"+i+"_02").val() == '' || $("#inputArticleHead"+i+"_02").val() == undefined){
                        alert("정렬 순서를 설정해 주세요");
                        return
                    }else{
                        articleHeadArray.push({articleHeadTitle : $("#inputArticleHead"+i+"_01").val(), ordered : $("#inputArticleHead"+i+"_02").val()});
                    }
                }
            }
            data.articleHeadArray = articleHeadArray;
        };

        console.log(data.articleHeadArray[0]);

        $.ajax({
            url : "/magazine/insert",
            method : "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data : JSON.stringify(data),
            success : function (result){

                if(result > 0){
                    alert("계간지 등록 성공");
                    location.href = "/magazine/list";
                }else{
                    alert("계간지 등록 실패");
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
                            $("#magazineThumbnailImage").val(data.resultMsg);
                            $("#magazineThumbnailImageFileName").val(data.orgFileNm);
                            $("#uploadValid").val("Y");
                            html += "<img src='" + data.resultMsg + "' alt='uploadImage' style='max-width: 150px;'>";
                            $("#imgControl").html(html);
                        }else{
                            alert("파일 업로드 실패, 다시 시도해 주세요.");
                            $("#uploadValid").val("N");
                            $("#magazineThumbnailImage").val("");
                            $("#magazineThumbnailImageFileName").val("");
                        }
                    },
                    error : function (data){
                        alert("시스템 에러 발생. 지속적인 오류 발생 시 관리자에게 문의해 주세요");
                        $("#uploadValid").val("N");
                        $("#magazineThumbnailImage").val("");
                        $("#magazineThumbnailImageFileName").val("");
                    }
                });
            },
            error : function (){
                console.log('resize error');
                return;
            }
        });
    },
    getMagazine : function (magazineSeq){
        $.ajax({
            url : "/magazine/"+magazineSeq,
            method : "GET",
            dataType: 'json',
            success : function (result){


            },
            error : function (x,h,r){
                console.log(x);
            }
        });
    },
    getArticleHead : function (magazineSeq){
        $.ajax({
            url : "/article/head/"+magazineSeq,
            method : "GET",
            dataType: 'json',
            success : function (result){


            },
            error : function (x,h,r){
                console.log(x);
            }
        });
    },
    getMagazineList : function (pageNum, pageSize){
        $.ajax({
            url : "/magazine/magazines",
            method : "GET",
            dataType : "json",
            data : {
                pageNum : pageNum,
                pageSize : pageSize
            },
            success : function (result){
                let html = "";
                if(result.list.length > 0){
                    html = main.drawMagazineList(result.list);
                }else{
                    html = "<tr><td colspan='6' style='text-align: center;'> 등록된 계간지가 없습니다.</td></tr>"
                }

                $("#magazineList").html(html);

                html = "";

                /*pagination*/
                if(result.prePage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Previous</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getMagazineList("+result.prePage+", 10)'>Previous</a></li>"
                }

                if(result.navigatepageNums.length > 0){
                    for(let i = result.navigateFirstPage; i <= result.navigateLastPage; i++){
                        if(result.pageNum == i){
                            html += "<li class='page-item active'><a class='page-link' onclick='main.getMagazineList("+i+", 10)'>"+i+"</a></li>"
                        }else{
                            html += "<li class='page-item'><a class='page-link' onclick='main.getMagazineList("+i+", 10)'>"+i+"</a></li>"
                        }
                    }
                }
                if(result.nextPage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Next</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getMagazineList("+result.nextPage+", 10)'>Next</a></li>"
                }
                $("#pagingNav").html(html);
            },
            error : function (x, h, r){
                console.log(x);
            }
        });
    },
    getMagazineListByKeyword : function (keyword, category, pageNum, pageSize){
        $.ajax({
            url : "/magazine/search/" +keyword+ "/" +category,
            method : "get",
            dataType: "json",
            data : {
                pageNum : pageNum,
                pageSize : pageSize
            },
            success : function (result){

                let html = main.drawMagazineList(result.list);
                $("#magazineList").html(html);

                html = "";
                if(result.prePage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Previous</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getMagazineListByKeyword("+'"'+keyword+'"'+","+'"'+category+'"'+","+result.prePage+", 10)'>Previous</a></li>"
                }

                if(result.navigatepageNums.length > 0){
                    for(let i = result.navigateFirstPage; i <= result.navigateLastPage; i++){
                        if(result.pageNum == i){
                            html += "<li class='page-item active'><a class='page-link' onclick='main.getMagazineListByKeyword("+'"'+keyword+'"'+","+'"'+category+'"'+","+i+", 10)'>"+i+"</a></li>"
                        }else{
                            html += "<li class='page-item'><a class='page-link' onclick='main.getMagazineListByKeyword("+'"'+keyword+'"'+","+'"'+category+'"'+","+i+", 10)'>"+i+"</a></li>"
                        }
                    }
                }
                if(result.nextPage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Next</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getMagazineListByKeyword("+'"'+keyword+'"'+","+'"'+category+'"'+","+result.nextPage+", 10)'>Next</a></li>"
                }

                $("#pagingNav").html(html);
            },
            error : function (x,h,r){
                console.log(x);
            }
        });
    },
    drawMagazineList : function (data){
        let html = "";
        $.each(data, function (index, item){
            html += "<tr>" +
                        "<td class='col-md-1'>"+item.magazineSeq+"</td>" +
                        "<td class='col-md-1'>";
                        if(item.magazineCategorySeq == 1) html += "계간 창작과비평";
                        if(item.magazineCategorySeq == 2) html += "계간 창비어린이";
                        if(item.magazineCategorySeq == 3) html += "계간 창작과비평 L";
                        html += "</td>" +
                        "<td class='col-md-2'><a href='/magazine/update/"+item.magazineSeq+"'>"+item.magazineTitle+"</a></td>" +
                        "<td class='col-md-1'>";
                        if(item.useYn == true) html += "<span style='color:forestgreen;'>사용중</span>";
                        else                   html += "<span style='color:indianred'>사용 안함</span>";
                        html += "</td>" +
                        "<td class='col-md-1'>"+item.appendDate+"</td>" +
                        "<td class='col-md-1'>"+item.updateDate+"</td>" +
                    "</tr>";
        });
        return html;
    },
    getMagazineYears : function (){
        try{
            for(let i = 1965; i <= 2050; i++){
                $("#inputYear").append("<option value='"+i+"'>"+i+"</option>");
            }
            return true;
        }catch (e){
            return false;
        }
    },
    selectNowYear : function (){
        let now = new Date();
        let year = now.getFullYear();
        $("#inputYear").val(year).attr("selected", "selected");
    }
}

main.init();