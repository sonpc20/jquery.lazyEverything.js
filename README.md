# jquery.lazyEverything.js
<script type="text/javascript" src="jquery.lazyEverything.js"></script>

function PageLazy()
{
    this.start = function ()
    {
        var $this = this;
        $("[data-lazy]").lazyLoadElement({
            onLazy: function (element)
            {
                var func = element.attr("data-lazy");               
                if (func != null && func != "") $this[func](element);
            }
        });
    }
}

How to Use
function YourPage()
{
    $.extend(this, new PageLazy());
     
    // element chính thẻ img mà khi màn hình scroll đến
    this.lazyImage = function (element)
    {
        element.attr("src", element.attr("data-src"));
    }
     
    // element chính là vùng mà bạn muốn load comment facebook khi màn hình scroll đến
    this.lazyFbComment = function(element)
    {
        var url = element.attr("data-fb-url");
        element.removeAttr("data-fb-url");
 
        var boxComment = $('<div class="fb-comments" data-width="100%" data-href="' + url + '"  data-numposts="5"></div>');
        element.append(boxComment);
         
        if (FB != null)
            FB.XFBML.parse(element[0]);
    }
}

in Html

<img data-src='sonpc20.logo.png' data-lazy="lazyImage" />
<section class="comment-container section section-comment" data-lazy="lazyFbComment" data-fb-url="http://sonpc20.com"></section>

visit to: http://sonpc20.com/huong-dan-su-dung-jquery-plugin-lazy-load-everything for example
