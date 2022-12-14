main = {
    init : function (){
        let _this = this;

        /*등록*/
        $("#productInsertBtn").on("click", function (){
           _this.insert();
        });

        /*수정*/
        $("#productUpdateBtn").on("click", function (){
            _this.update();

        })
        /*삭제*/
        $("#productDeleteBtn").on("click", function (){
            _this.delete();
        })

        /*검색*/
        $("#searchBtn").on('click', function (){
            let searchKeyword = $("#searchKeyword").val();
            let searchType = $("#searchType").val();
            /*if(searchKeyword == '' || searchKeyword == undefined){
                alert("검색어를 입력해 주세요.");
                return;
            }*/
            /*_this.getMagazineListByKeyword(searchKeyword, searchType,1, 10);*/

        });

        /*파일업로드*/
        $("#uploadBtn").on("click", function (){
            $('#loading').show();
            _this.upload();
        });
    },
    insert : function (){
        //입력값
        let useYn = $(":radio[name=inputUseYn]:checked").val();                 //사용여부
        let title = $("#inputTitle").val();                                     //상품명
        let category = $("select[name=inputCategory] option:selected").val();   //상품 카테고리
        let content = CKEDITOR.instances['inputContent'].getData();             //상품 설명
        let price = $("#inputPrice").val();                                     //상품 가격
        let releaseDate = new Date($("#inputReleaseDate").val());               //상품 출시일
        let stock = $("#inputStock").val();                                     //상품 재고
        let productThumbnailImage = $("#productThumbnailImage").val();          //섬네일 이미지 URL
        let productThumbnailImageFileName = $("#productThumbnailImageFileName").val();  //섬네일 이미지 파일명


        /*입력 데이터 검증*/
        if(title == '' || title == undefined){
            alert("상품명을 입력해 주세요. (필수 항목)");
            $("#inputTitle").focus();
            return;
        };

        let data = {
            useYn : useYn,
            productTitle : title,
            productCategorySeq : category,
            productContent : content,
            productPrice : price,
            productReleaseDate : releaseDate,
            productStock : stock,
            productThumbnailImage : productThumbnailImage,
            productThumbnailImageFileName : productThumbnailImageFileName
        };

        $.ajax({
            url : "/product/insert",
            method : "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data : JSON.stringify(data),
            success : function (result){

                if(result > 0){
                    alert("상품 등록 성공");
                    location.href = "/product/list";
                }else{
                    alert("상품 등록 실패");
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
        //입력 데이터
        let productSeq = $("#productSeq").val();                                //고유번호
        let useYn = $(":radio[name=inputUseYn]:checked").val();                 //사용여부
        let title = $("#inputTitle").val();                                     //상품명
        let category = $("select[name=inputCategory] option:selected").val();   //상품 카테고리
        let content = CKEDITOR.instances['inputContent'].getData();             //상품 설명
        let price = $("#inputPrice").val();                                     //상품 가격
        let releaseDate = new Date($("#inputReleaseDate").val());               //상품 출시일
        let stock = $("#inputStock").val();                                     //상품 재고
        let productThumbnailImage = $("#productThumbnailImage").val();          //섬네일 이미지 URL
        let productThumbnailImageFileName = $("#productThumbnailImageFileName").val();  //섬네일 이미지 파일명

        /*입력 데이터 검증*/
        if(title == '' || title == undefined){
            alert("본문 제목을 입력해 주세요. (필수 항목)");
            $("#inputTitle").focus();
            return;
        };

        let data = {
            productSeq : productSeq,
            useYn : useYn,
            productTitle : title,
            productCategorySeq : category,
            productContent : content,
            productPrice : price,
            productReleaseDate : releaseDate,
            productStock : stock,
            productThumbnailImage : productThumbnailImage,
            productThumbnailImageFileName : productThumbnailImageFileName
        };
        
        $.ajax({
            url : "/product/update/"+productSeq,
            method : "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data : JSON.stringify(data),
            success : function (result){

                if(result > 0){
                    alert("상품 수정 성공");
                    location.reload();
                }else{
                    alert("상품 수정 실패");
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
        let magazineSeq = $("#selectedMagazineSeq").val();
        $.ajax({
           url: "/magazine/delete/"+magazineSeq,
           method: "DELETE",
            success: function (result){
               if(result > 0){
                   alert("상품 삭제 성공");
                   location.href = "/magazine/list";
               }else{
                   alert("상품 삭제 실패");
                   location.reload();
               }

            },
            error : function (x, h, r){
               alert("시스템 오류 발생. 관리자에게 문의해 주세요.");
               return;
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
    },getProductList : function (pageNum, pageSize){
        $.ajax({
            url : "/product/products",
            method : "GET",
            dataType : "json",
            data : {
                pageNum : pageNum,
                pageSize : pageSize
            },
            success : function (result){
                let html = "";
                if(result.list.length > 0){
                    html = main.drawProductList(result.list);
                }else{
                    html = "<tr><td colspan='6' style='text-align: center;'> 등록된 상품가 없습니다.</td></tr>"
                }

                $("#productList").html(html);

                html = "";

                if(result.prePage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Previous</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getProductList("+result.prePage+", 10)'>Previous</a></li>"
                }

                if(result.navigatepageNums.length > 0){
                    for(let i = result.navigateFirstPage; i <= result.navigateLastPage; i++){
                        if(result.pageNum == i){
                            html += "<li class='page-item active'><a class='page-link' onclick='main.getProductList("+i+", 10)'>"+i+"</a></li>"
                        }else{
                            html += "<li class='page-item'><a class='page-link' onclick='main.getProductList("+i+", 10)'>"+i+"</a></li>"
                        }
                    }
                }
                if(result.nextPage == 0){
                    html += "<li class='page-item disable' ><a class='page-link'>Next</a></li>"
                }else{
                    html += "<li class='page-item'><a class='page-link' onclick='main.getProductList("+result.nextPage+", 10)'>Next</a></li>"
                }
                $("#pagingNav").html(html);
            },
            error : function (x, h, r){
                console.log(x);
            }
        });
    },
    drawProductList : function (list){
        let html = "";
        $.each(list, function (index, item){
            html += "<tr>" +
                "<td class='col-md-1'>"+item.productSeq+"</td>" +
                "<td class='col-md-1'>"+item.productCategoryValue+"</td>" +
                "<td class='col-md-2'><a href='/product/update/"+item.productSeq+"'>"+item.productTitle+"</a></td>" +
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
    getProductData : function (productSeq){
        $.ajax({
            url : "/product/"+productSeq,
            method : "GET",
            dataType: 'json',
            success : function (result){
                if(result != null && result != undefined){
                    $("#inputTitle").val(result.productTitle);
                    $("input[name='inputUseYn'][value='"+result.useYn+"']").prop("checked", true);
                    $("#inputCategory").val(result.productCategorySeq).attr("selected", "selected");
                    $("#inputPrice").val(result.productPrice);
                    $("#inputReleaseDate").val(moment(result.productReleaseDate).format('YYYY-MM-DD'));
                    $("#inputStock").val(result.productStock);
                    $("#inputContent").val(result.productContent);

                    $("#productThumbnailImage").val(result.productThumbnailImage);
                    $("#productThumbnailImageFileName").val(result.productThumbnailImageFileName);

                    $("#uploadedImg").val('업로드 자료 : ' +result.productThumbnailImageFileName);

                }else{
                    alert("데이터 조회 실패, 다시 시도해 주세요.");
                    return;
                }


            },
            error : function (x,h,r){
                alert("시스템 오류 발생. 관리자에게 문의해 주세요.");
                return;
            }
        });
    }
    /*getMagazineData : function (magazineSeq){
        $.ajax({
            url : "/magazine/"+magazineSeq,
            method : "GET",
            dataType: 'json',
            success : function (result){
                if(result != null && result != undefined){

                    $("#inputTitle").val(result.magazineTitle);
                    if(result.useYn == 1){
                        $("#useY").prop("checked", true);
                    }else{
                        $("#useN").prop("checked", true);
                    }
                    $("#inputCategory").val(result.magazineCategorySeq).attr("selected", "selected");
                    $("#inputYear").val(result.magazineYear).attr("selected", "selected");
                    $("#inputSeason").val(result.magazineSeason).attr("selected", "selected");
                    $("#inputVolume").val(result.magazineVolume);
                    $("#inputContent").val(result.magazineContent);

                    $("#magazineThumbnailImage").val(result.magazineThumbnailImage);
                    $("#magazineThumbnailImageFileName").val(result.magazineThumbnailImageFileName);

                    $("#uploadedImg").val('업로드 자료 : ' +result.magazineThumbnailImageFileName);

                }else{
                    alert("데이터 조회 실패, 다시 시도해 주세요.");
                    return;
                }


            },
            error : function (x,h,r){
                alert("시스템 오류 발생. 관리자에게 문의해 주세요.");
                return;
            }
        });
    },
    getArticleHead : function (magazineSeq){
        $.ajax({
            url : "/article/head/"+magazineSeq,
            method : "GET",
            dataType: 'json',
            success : function (result){
                if(result != null && result.length > 0){
                    let html = "";
                    articleCnt = result.length;

                    $.each(result, function (index, item){
                        html += "<div id='articleHead"+(index + 1)+"' class='row'>" +
                                    "<span>"+(index + 1) +". </span>" +
                                    "<div class='col-8'>" +
                                        "<input  class='form-control' type='text' id='inputArticleHead"+((index + 1))+"_01' value='"+item.articleHeadTitle+"' disabled>" +
                                    "</div>" +
                                    "<div class='col-2'>" +
                                        "<input class='form-control' type='number' id='inputArticleHead"+((index + 1))+"_02' value='"+item.ordered+"' disabled>"+
                                    "</div>" +
                                    "<div class='col-2'>"+
                                        "<button type='button' class='btn btn-danger articleHeadRemoveBtn' data-cnt='"+((index + 1))+"' style='max-height: 35px;' >삭제</button>" +
                                        "<button type='button' class='btn btn-primary gotoUpdate' data-cnt='"+((item.articleHeadSeq))+"' style='max-height: 35px;' >수정</button>" +
                                    "</div>" +
                                "</div>";
                    });

                    $("#articleHeadDiv").append(html);

                    $(".articleHeadRemoveBtn").off().on("click", function (){
                        $("#articleHead"+$(this).attr("data-cnt")).remove();
                        /!*$(this).prev().prev().remove(); // remove the textbox
                        $(this).remove(); // remove the button*!/
                        $(this).remove();
                        articleCnt--;
                    });
                }
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
                    html = "<tr><td colspan='6' style='text-align: center;'> 등록된 상품가 없습니다.</td></tr>"
                }

                $("#magazineList").html(html);

                html = "";

                /!*pagination*!/
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
    getMagazineListByKeyword : function (searchKeyword, searchType, pageNum, pageSize){


        $.ajax({
            url : "/magazine/search/" +searchKeyword+ "/" +searchType,
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
                        if(item.magazineCategorySeq == 1) html += "  프로젝트";
                        if(item.magazineCategorySeq == 2) html += "  프로젝트어린이";
                        if(item.magazineCategorySeq == 3) html += "  프로젝트 L";
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
    },*/
}

main.init();