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

    },
    insert: function (){

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
    }
}

main.init();