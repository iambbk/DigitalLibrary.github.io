
$(document).ready(function () {

    $(document).on('click', '.abst', function () {
        debugger;
        var id = $(this).attr('data-id');        
        if ($('#' + id).is(":visible")) {
            $('#' + id).hide();
        } else {
            $('#' + id).show();
        }
    })
    $("#subBtn").click(function () {
        var etaurl = 'http://ieeexploreapi.ieee.org/api/v1/search/articles?apikey=h55cdev38ncwy8pd678suhtb&format=json&max_records=200&start_record=1&sort_order=asc&sort_field=article_title';
        var tta = '';
        if ($('#q1').val() != 'Select Category') {
            tta += '&' + $('#q1').val() + '=' + $('#q1value').val();
        }
        if ($('#q2').val() != 'Select Category') {
            tta += '&' + $('#q2').val() + '=' + $('#q2value').val();
        }
        if ($('#q3').val() != 'Select Category') {
            tta += '&' + $('#q3').val() + '=' + $('#q3value').val();
        }

        $.ajax({
            url: encodeURI(etaurl + tta), success: function (result) {
                //$("#searchMaterial").html(result);
                var mmhtm = '';
                if (result && result.articles) {
                    $.each(result.articles, function (i, obj) {
                        if (chkprop(obj, "title")) {
                            mmhtm += "<div class='maindivdata'>";
                            mmhtm += "<div class='ttl'><a href='" + obj.html_url + "'>" + obj.title + "</a></div>";
                            if (obj.authors && chkprop(obj.authors, "authors")) {
                                mmhtm += "<div class='auths' >";
                                $.each(obj.authors.authors, function (j, ttlssd) {
                                    mmhtm += "&nbsp; <a title='author' href='" + ttlssd.authorUrl + "'>" + ttlssd.full_name + "</a>";
                                });
                                mmhtm += "</div>";
                            }
                            mmhtm += "<div class='ppTitle'> <a href='" + obj.abstract_url + "'> " + obj.publication_title + "</a></div>";
			    if (chkprop(obj, "isbn")) {
mmhtm += "<div class='minobjects'> Year: " + obj.publication_year + " | " + obj.content_type + " | Publisher: " + obj.publisher + " | ISBN: " + obj.isbn + " | DOI: " + obj.doi + " | Publication Number: " + obj.publication_number + "</div>";
			    }
else if (chkprop(obj, "issn")){
mmhtm += "<div class='minobjects'> Year: " + obj.publication_year + " | " + obj.content_type + " | Publisher: " + obj.publisher + " | ISSN: " + obj.issn + " | DOI: " + obj.doi + " | Publication Number: " + obj.publication_number + "</div>";
}
else{
mmhtm += "<div class='minobjects'> Year: " + obj.publication_year + " | " + obj.content_type + " | Publisher: " + obj.publisher + " | DOI: " + obj.doi + " | Publication Number: " + obj.publication_number + "</div>";
}
                            
                            mmhtm += "<div class='pdfdonw'><a class='abst' data-id='dw_abstract" + i + "'> Abstract</a> &nbsp; <a href='" + obj.pdf_url + "'><img src='Includes/webimages/pdf.png' class='pdfdonwimg' /></a> <br><br><div class='divtext' id='dw_abstract" + i + "' style='display:none;'> " + obj.abstract + "</div></div>";
                            mmhtm += "</div>";

                        }
                    });
                    $("#searchMaterial").html(mmhtm);
                }

            }
        });
    });

    $(document)
  .ajaxStart(function () {
      $('#loaaader').show();
  })
  .ajaxStop(function () {
      $('#loaaader').hide();
  });
});
function chkprop(obj, pname) {
    return obj.hasOwnProperty(pname);
}