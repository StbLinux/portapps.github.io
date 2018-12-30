var actionAppDownload={init:function(e){if(!($(e).length<=0)){$(e).removeClass("hide");var a=$("#app-name").val(),t=null,n=null;$.getJSON("/api/v1/apps/"+a+".json",function(e){t=e,n=actionAppDownload.getCurrentRelease(e.releases),$.each(e.releases,function(e,a){var t=n.version===a.version&&n.release===a.release,o=a.version+"-"+a.release;t?o+=" (current release)":"pre-release"===a.type&&(o+=" (development release)"),$("#app-version").append($("<option>",{value:a.version+";"+a.release,text:o}).attr("data-rtype",a.type)),t&&($("#app-version").val(a.version+";"+a.release),actionAppDownload.setPlatforms(a.platforms),$("#app-platform").val(actionAppDownload.getRecommendedPlatform(a.platforms)),actionAppDownload.setFormats(a.formats),$("#app-format").val(a.formats[0]))}),actionAppDownload.refreshDownloadButton(t)}),$("#app-version").change(function(){actionAppDownload.resetSelects(t),actionAppDownload.refreshDownloadButton(t)}),$("#app-platform").change(function(){actionAppDownload.refreshDownloadButton(t)}),$("#app-format").change(function(){actionAppDownload.refreshDownloadButton(t)})}},refreshDownloadButton:function(e){var a=$("#app-version").val(),t=a.split(";"),n=t[0]+"-"+t[1],o=$("option:selected",$("#app-version")).attr("data-rtype"),i=$("#app-platform").val(),l=$("#app-format").val(),s="setup"===l?"-setup.exe":"."+l,p=""===i?n:i+"-"+n,r=["win64","x64",""].indexOf(i)>-1?"btn-success":"btn-warning";$(".app-download-button").empty(),"pre-release"===o&&$(".app-download-button").append($("<div>",{class:"bs-callout bs-callout-warning",style:"margin: 0 0 10px;"}).append("<h4>Development release!</h4>").append("<p>"+n+" is not a released version of "+e.label+" Portable. <strong>Be careful</strong>, things are unstable and might even be broken.</p>")),$(".app-download-button").fadeOut(250).append($("<a>",{href:"/download/"+e.name+"-portable-"+p+s,class:"btn "+r,style:"text-align: left;"}).append('<span class="app-download-text"><span class="fa fa-download"></span>&nbsp;Download</span><br />').append("<small>"+e.name+"-portable-"+p+s+"</small>")).fadeIn(250)},resetSelects:function(e){var a=$("#app-version").val(),t=a.split(";"),n=t[0],o=t[1];$.each(e.releases,function(e,a){if(a.version===n&&a.release===o)return actionAppDownload.setPlatforms(a.platforms),$("#app-platform").val(actionAppDownload.getRecommendedPlatform(a.platforms)),actionAppDownload.setFormats(a.formats),!1})},setPlatforms:function(e){$("#app-platform").find("option").remove().end(),$.each(e,function(e,a){var t=a;["win64","x64"].indexOf(a)>-1&&(t="Windows 64-bits"),["win32","ia32"].indexOf(a)>-1&&(t="Windows 32-bits"),""===a&&(t="Windows 32-bits / 64-bits"),$("#app-platform").append($("<option>",{value:a,text:t}))})},setFormats:function(e){$("#app-format").find("option").remove().end(),$.each(e,function(e,a){var t=a;"setup"===a?t="Portable setup (recommended)":"7z"===a?t="7z archive":"zip"===a&&(t="zip archive"),$("#app-format").append($("<option>",{value:a,text:t}))})},getCurrentRelease:function(e){var a=null;return $.each(e,function(e,t){if("release"===t.type)return a=t,!1}),a},getRecommendedPlatform:function(e){var a=null,t=null;return $.each(e,function(e,n){["win64","x64"].indexOf(n)>-1&&(a=n),["win32","ia32"].indexOf(n)>-1&&(t=n)}),null!==a?a:null!==t?t:""}},actionCards={init:function(e){$(e).length<=0||$(e+" .item-inner").matchHeight()}},actionCdTop={init:function(e){$(e).length<=0||($(window).scroll(function(){$(this).scrollTop()>300?$(e).addClass("cd-is-visible"):$(e).removeClass("cd-is-visible cd-fade-out"),$(this).scrollTop()>1200&&$(e).addClass("cd-fade-out")}),$(e).on("click",function(e){e.preventDefault(),$("body, html").animate({scrollTop:0},700)}))}},actionHome={init:function(e){$(e).length<=0||$(e+" .item").matchHeight()}},actionProgressbar={init:function(e){$(e).length<=0||$(".progressbar-fill").delay(1e3).queue(function(){var e=$(this).attr("data-time")||2;$(this).css("width","100%").css("transition","width "+e+"s ease-in-out")})}};$(document).ready(function(){$(window).on("load resize",function(){$(window).trigger("scroll")}),$("a.scrollto").on("click",function(e){var a=this.hash;e.preventDefault(),$("body").scrollTo(a,800,{offset:0,axis:"y"})}),WebFont.load({google:{families:["Lora:400,700,400italic,700italic","Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800"]}}),$('[data-toggle="tooltip"]').tooltip(),$("#searchapp").length>0&&$("#searchapp").keyup(function(){var e=$(this).val(),a=0;$(".cards-wrapper .item-enable").each(function(){$(".item-enable").attr("data-app");$(this).text().search(new RegExp(e,"i"))<0?$(this).hide():($(this).show(),a++)})}),actionCdTop.init(".cd-top"),actionHome.init(".home"),actionProgressbar.init(".progressbar"),actionCards.init(".card-section"),actionAppDownload.init(".download-list")});