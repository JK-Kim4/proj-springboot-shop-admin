let main = {
    init : function (){
        let _this = this;
        
        /*파일 업로드*/
        $("#uploadBtn").on("click", function (){
           _this.upload();
        });

        /*상품 등록*/
        $("#productInsertBtn").on("click", function (){
           _this.insert();
        });

        /*상품 수정*/

        /*상품 삭제*/
        $("#productDeleteBtn").on("click", function (){
            _this.delete();
        })
    },
    insert: function (){
        //입력 값
        let productName = $("#inputTitle").val();
        let useYn = $(":radio[name='inputYn']:checked").val();
        let productPrice = $("#inputPrice").val();
        let discountRate = $("#inputDiscountRate").val();
        let productPeriod = $("#inputPeriod").val();
        let productContent = CKEDITOR.instances["inputContent"].getData();
        let productImageFile = $("#productImageFile").val();
        let productImageFileName = $("#productImageFileName").val();
        let productType = $("#inputType").val();

        if(productName == undefined || productName == ''){
            alert("상품명을 입력해 주세요.(필수)");
            $("#inputTitle").focus();
            return;
        }else if(productPrice == undefined || productPrice == ''){
            alert("상품 가격을 입력해 주세요.(필수)");
            $("#inputPrice").focus();
            return;
        }else if(productPeriod == undefined || productPeriod == ''){
            alert("상품 기간을 입력해 주세요.");
            $("#inputPeriod").focus();
            return;
        }

        let data = {
            productType : productType,
            productName: productName,
            productContent: productContent,
            productPrice: productPrice,
            productPeriod: productPeriod,
            useYn: useYn,
            discountRate: discountRate,
            productImageFile : productImageFile,
            productImageFileName: productImageFileName
        }

        if( ($("#inputStartDate").val() != undefined && $("#inputStartDate").val() != '') &&
                    ($("#inputEndDate").val() != undefined && $("#inputEndDate").val() != '')){

            let startDate = $("#inputStartDate").val() + " " + "00:00";
            let endDate = $("#inputEndDate").val() + " " + "23:59";
            if(!moment(endDate).isAfter(startDate)){
                alert("게시 종료일은 게시 시작일 보다 앞설 수 없습니다. \n 기간을 다시 설정해 주세요");
                return;
            }else{
                startDate = moment(startDate).format('YYYY-MM-DD HH:mm');
                endDate = moment(endDate).format('YYYY-MM-DD HH:mm');
            }
            data.startDate = new Date(startDate);
            data.endDate = new Date(endDate);
        }

        $.ajax({
            url: "/product/insert",
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf8",
            data: JSON.stringify(data),
            success : function (result){
                if(result > 0){
                    alert("상품 등록 성공");
                    location.href = "/product/list"
                }else{
                    alert("상품 등록 실패");
                    return;
                }
            },
            error : function (x,h,r){
                alert("시스템 오류 발생. 관리자에게 문의해 주세요.");
                return;
            }
        });
    },
    delete : function (){
        let productSeq = $("#productSeq").val();

        $.ajax({
            url: "/product/delete/"+productSeq,
            method: "DELETE",
            dataType: "json",
            success : function (result){
                if(result > 0){
                    alert("상품 삭제 성공");
                    location.href = "/product/list";
                }else{
                    alert("상품 삭제 실패. 다시 시도해 주세요.");
                    location.reload();
                }
            },
            error : function (x,h,r){
                alert("시스템 에러 발생. 관리자에게 문의해 주세요.");
                return;
            }
        })
    },
    upload: function (){

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
                            $("#uploadBtn").hide();
                            $("#productImageFile").val(data.resultMsg);
                            $("#productImageFileName").val(data.orgFileNm);
                            $("#uploadValid").val("Y");
                            html += "<img src='" + data.resultMsg + "' alt='uploadImage' style='max-width: 150px;'>";
                            $("#imgControl").html(html);
                        }else{
                            alert("파일 업로드 실패, 다시 시도해 주세요.");
                            $("#uploadValid").val("N");
                            $("#productImageFile").val("");
                            $("#productImageFileName").val("");
                        }
                    },
                    error : function (data){
                        alert("시스템 에러 발생. 지속적인 오류 발생 시 관리자에게 문의해 주세요");
                        $("#uploadValid").val("N");
                        $("#productImageFile").val("");
                        $("#productImageFileName").val("");
                    }
                });
            },
            error : function (){
                console.log('resize error');
                return;
            }
        });
    },
    getProductList : function (pageNum, pageSize){
        $.ajax({
            url : "/product/products",
            method: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: {
                pageNum: pageNum,
                pageSize: pageSize
            },
            success: function (result){
                let html = "";
                if(result.list.length > 0){
                    html = main.drawProductListData(result.list);
                }else{
                    html = "<tr><td colspan='7' style='text-align: center;'> 등록된 상품이 없습니다. </td></tr>"
                }

                $("#productList").html(html);

                html = "";

                /*pagination*/
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
            error: function (x,h,r){
                alert("시스템 오류 발생. 관리자에게 문의해 주세요.");
                return;
            }
        });
    },
    drawProductListData : function (data){
        let html = "";
        $.each(data, function (index,item){
            html += "<tr>" +
                "<td class='col-md-1'>"+item.productSeq+"</td>" +
                "<td class='col-md-1'>"+item.productType+"</td>" +
                "<td class='col-md-1'><a href='/product/update/"+item.productSeq+"'>"+item.productName+"</a></td>" +
                "<td class='col-md-1'>"+item.productPrice+"</td>" +
                "<td class='col-md-1'>"+item.useYn+"</td>" +
                "<td class='col-md-1'>"+item.appendDate+"</td>" +
                "<td class='col-md-1'>"+item.updateDate+"</td>" +
                    "</tr>";
        });
        return html;
    },
    getProductData: function (productSeq){
        if(productSeq == undefined || productSeq == ''){
            alert("상품 정보가 존재하지 않습니다. 지속적인 오류 발생 시 관리자에게 문의해 주세요.");
            return;
        }

        $.ajax({
            url: "/product/"+productSeq,
            method: "GET",
            dataType: "json",
            success : function (result){
                console.log(result);
                $("#inputTitle").val(result.productName);

                if(result.useYn == 1){
                    $("#useY").prop("checked", true);
                }else{
                    $("#useN").prop("checked", true);
                }

                $("#inputStartDate").val(moment(result.startDate).format('YYYY-MM-DD'));
                $("#inputEndDate").val(moment(result.endDate).format('YYYY-MM-DD'));
                $("#inputType").val(result.productType).attr("selected", "selected");
                $("#inputPrice").val(result.productPrice);
                $("#inputDiscountRate").val(result.discountRate).attr("selected", "selected");
                $("#inputPeriod").val(result.productPeriod).attr("selected", "selected");
                $("#inputContent").val(result.productContent);
                $("#productImageFile").val(result.productImageFile);
                $("#productImageFileName").val(result.productImageFileName);
                $("#uploadValid").val("Y");
                $("#uploadedImg").val('업로드 자료 : ' +result.productImageFileName);

            },
            error : function (x,h,r){
                alert("시스템 에러 발생. 관리자에게 문의해 주세요.");
                return;
            }
        });
    }
}

main.init();