main = {
    init : function (){
        let _this = this;


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
    }
}

main.init();