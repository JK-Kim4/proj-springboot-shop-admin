let main = {
    init : function (){
        let _this = this;




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