export const util = {};

export const SortList = (container, listQuery) => {
  const range = { x: 0, y: 0 }; // 鼠标元素偏移量
  const lastPos = { x: 0, y: 0, x1: 0, y1: 0 }; // 拖拽对象的四个坐标
  const tarPos = { x: 0, y: 0, x1: 0, y1: 0 }; // 目标元素对象的坐标初始化

  let theDiv;
  let tempDiv;
  let theDivHeight = 0;
  let theDivHalf = 0;
  let tarFirstY = 0;
  let tarDiv = null;
  let tarFirst = null;
  let move = false;
  $(listQuery).each(function () {
    $(this).on('mousedown', function (event) {
      // alert(container);
      // 拖拽对象
      theDiv = $(this);
      // 鼠标元素相对偏移量
      range.x = event.pageX - theDiv.offset().left;
      range.y = event.pageY - theDiv.offset().top;
      theDivHeight = theDiv.height();
      theDivHalf = theDivHeight / 2;
      move = true;
      theDiv.attr('class', 'draglist_dash');
      theDiv.css({ top: (theDiv.offset().top - 312) + 'px' });
      // 创建新元素 插入拖拽元素之前的位置(虚线框)
      $('<div class="dash"></div>').insertBefore(theDiv);
      tempDiv = $('.dash');
      });
  });
  $(document).mousemove(function (event) {
    if (!move) return false;
    // lastPos.x = event.pageX - range.x;
    lastPos.y = event.pageY - range.y;
    lastPos.y1 = lastPos.y + theDivHeight;
    // 拖拽元素随鼠标移动
    theDiv.css({ top: (lastPos.y - 312) + 'px' });
    // 拖拽元素随鼠标移动 查找插入目标元素
    const $draglist = $('.draglist'); // 局部变量：按照重新排列过的顺序  再次获取 各个元素的坐标，
    tempDiv = $('.dash'); // 获得临时 虚线框的对象

    $draglist.each(function () {
      tarDiv = $(this);
      tarPos.x = tarDiv.offset().left;
      tarPos.y = tarDiv.offset().top;
      tarPos.y1 = tarPos.y + (tarDiv.height() / 2);

      tarFirst = $draglist.eq(0); // 获得第一个元素
      tarFirstY = tarFirst.offset().top + theDivHalf; // 第一个元素对象的中心纵坐标

      // 拖拽对象 移动到第一个位置
      if (lastPos.y <= tarFirstY) {
        tempDiv.insertBefore(tarFirst);
      }
      // 判断要插入目标元素的 坐标后， 直接插入
      if (lastPos.y >= tarPos.y - theDivHalf && lastPos.y1 >= tarPos.y1) {
        tempDiv.insertAfter(tarDiv);
      }
    });
  });
  $(document).mouseup(function (event) {
    if (!theDiv) return;
    theDiv.insertBefore(tempDiv);  // 拖拽元素插入到 虚线div的位置上
    theDiv.attr('class', 'draglist'); // 恢复对象的初始样式
    $('.dash').remove(); // 删除新建的虚线div
    move = false;
    theDiv = undefined;
    tempDiv = undefined;
  });
};
