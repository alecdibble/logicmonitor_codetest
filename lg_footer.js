(function($, global){

  global.LogicMonitor = {

    /* Public: init
    */

    init: function(count, truncLength, style, url) {
      this.bindEvents();
      this.count = count || 2;
      this.truncLength = truncLength || 40;
      this.headerStyle = style || 0;
      this.divWidth = $('.footer div div').width();
      console.log("Width of of upper div: " + this.divWidth);
      this.feedUrl = url || "http://blog.logicmonitor.com/feed/";
      this.getFeed();
    },

    redraw: function(count, truncLength) {

    },

    bindEvents: function(){ //bind all our events
      //resize
    },

    truncateText: function(self, text) {
      if(text.length > (self.truncLength - 3)) {
        text = text.substring(0, (self.truncLength));
        text = text.substring(0, text.lastIndexOf(" "));
        text = text + '...';
      }
      return text;
    },

    displayBlogFeed: function() {
      var self = this;
      switch(parseInt(self.headerStyle)) {
        case 0:
          $('.latest-blog p').append("<strong id=\"latest-blog_header\">Latest Blog Posts</strong><ul></ul>");
          break;
        case 1:
          $('.latest-blog p').append("<h6 id=\"latest-blog_header\">Latest Blog Posts</h6><ul></ul>");
          break;
        case 2:
          $('.latest-blog p').append("<div class=\"one columns\"></div><div class=\"eleven columns\"><h6 id=\"latest-blog_header\">Latest Blog Posts</h6><ul></ul></div>");
          break;
        default:
          $('.latest-blog p').append("<strong id=\"latest-blog_header\">Latest Blog Posts</strong><ul></ul>");
          break;
      }
      $.each(self.feed.entries, function(i, el) {
        $('.latest-blog p ul').append("<li><a href=\"" + el.link + "\">" + self.truncateText(self, el.title)+ "</a></li>");
        if(i >= self.count - 1) {
          return false;
        }
      });
    },

    refreshUI: function() {
      $('.latest-blog p').empty();
    },


    getFeed: function() {
      var self = this;
      jQuery.ajax({
        url      : 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(self.feedUrl),
        dataType : 'json',
        success  : function (data) {
          if (data.responseData.feed && data.responseData.feed.entries) {
            $.each(data.responseData.feed.entries, function (i, e) {
              console.log("------------------------");
              console.log("title      : " + e.title);
              console.log("author     : " + e.author);
              console.log("description: " + e.description);
            });
            self.feed = data.responseData.feed;
            self.displayBlogFeed();
          }
        }
      });
    },

    refreshCount: function() {
      this.refreshUI();
      var newCount = $('#count-input').val();
      this.init(newCount, this.truncLength, this.headerStyle, this.feedUrl);
    },

    refreshTrunc: function() {
      this.refreshUI();
      var newTrunc = $('#trunc-input').val();
      this.init(this.count, newTrunc, this.headerStyle, this.feedUrl);
    },

    refresh: function() {
      this.refreshUI();
      var newTrunc = $('#trunc-input').val();
      var newCount = $('#count-input').val();
      var newStyle = $('#style-input').val();
      var newUrl = $('#feed-input').val();
      this.init(newCount, newTrunc, newStyle, newUrl);
    }



  };


  $(document).ready(function(){
    global.LogicMonitor.init();
  });

})(jQuery, window);
