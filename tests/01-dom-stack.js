describe("DOM Stack Tests", function () {
  it('$(li).objectType shoud be `domstack`.', function() {
    expect($('li').objectType).to.equal('domstack')
  });

  it('$(li).array should be an array.', function() {
    expect(Array.isArray($('li').array)).to.equal(true)
  });

  it('$(li).array.length is greater than 0.', function() {
    chai.assert.isAbove($('li').array.length, 0)
  });

  it('$(li).array[0] should contain list item node.', function() {
    expect($('li').array[0].nodeName).to.equal('LI')
  });

  it('$("li").length should be greater than 0.', function() {
    chai.assert.isAbove($('li').length, 0);
  });

  it('$("li").eq(0) should return first list item.', function() {
    expect($('li').eq(0).text()).to.equal('One')
  });

  it('$("li").eq(1) should return second list item.', function() {
    expect($('li').eq(1).text()).to.equal('Two')
  });

  it('$("p").eq(-1) should return last list item.', function() {
    expect($('p').eq(-1).text()).to.equal('p 3')
  });

  it('$("p").eq(-2) should return next to last list item.', function() {
    expect($('p').eq(-2).text()).to.equal('p 2')
  });

  it('$("li").eq(2) should return third list item.', function() {
    expect($('li').eq(2).text()).to.equal('Three')
  });

  it('$("p").push($("<p>Last paragraph</p>")) should increase number of P tags by 1.', function() {
    var len = $('p').length;
    var p = $("p");
    p.push($('<p>Last paragraph</p>'));
    expect(p.length).to.equal(len + 1);
  });

  it('$("p").push($("<p>Last paragraph</p>")), last P tag should contain `Last paragraph`.', function() {
    var p = $("p");
    var lastP = $('<p>Last paragraph</p>');
    p.push(lastP);
    expect(p.eq(-1).text()).to.equal('Last paragraph');
  });

  it('$("p").pop() should reduce P tags by 1.', function() {
    var len = $('p').length;
    var p = $("p");
    p.pop();
    expect(p.length).to.equal(len -1);
    expect(p.eq(1).text()).to.equal('p 2');
    expect(p.eq(2).length).to.equal(0);
  });

  it('$("p").pop() should return last DOMStack item.', function() {
    var p = $("p");
    var lastP = p.pop();
    expect(lastP[0].nodeType).to.equal(1);
    expect(lastP[0].nodeName).to.equal('P');
    expect(lastP[0].textContent).to.equal('p 3');
  });

  it('$("p").unshift($("<p>First paragraph</p>")) should increase number of P tags by 1.', function() {
    var len = $('p').length;
    var p = $('p');
    p.unshift($('<p>First paragraph</p>'));
    expect(p.length).to.equal(len + 1);
  });

  it('$("p").unshift($("<p>First paragraph</p>")) should insert this as first P tag in DOMStack.', function() {
    var len = $('p').length;
    var p = $('p');
    p.unshift($('<p>First paragraph</p>'));
    expect(p.eq(0).text()).to.equal('First paragraph');
  });

  it('$("p").shift() should remove first item of DOMStack, reducing length by 1.', function() {
    var len = $('p').length;
    var p = $('p');
    p.shift();
    expect(p.length).to.equal(len - 1);
  });

  it('$("p").shift() should return first DOMStack item.', function() {
    var p = $("p");
    var lastP = p.shift();
    expect(lastP[0].nodeType).to.equal(1);
    expect(lastP[0].nodeName).to.equal('P');
    expect(lastP[0].textContent).to.equal('p 1');
  });

  it('$("p").size() should return the number of items in the DOMStack.', function() {
    expect($('p').size()).to.equal(3);
  });

  it('$("p").forEach(ctx, idx) should loop over all DOMStack items once.', function() {
    var num = undefined;
    var len = 0;
    $("p").forEach(function(ctx, idx) {
      num = idx;
      len += idx;
    });
    expect(num).to.equal(2);
    expect(len).to.equal($("p").length);
  });

  it('$("p").forEach(ctx, idx) should expose DOM nodes as context.', function() {
    var nodes = [];
    $("p").forEach(function(ctx, idx) {
      if (ctx.nodeType === 1) {
        nodes.push(ctx);
      }
    });
    expect(nodes.length).to.equal(3);
  });

  it('$("p").forEach(ctx, idx) should expose index value of iteration.', function() {    var num = undefined;
    $("p").forEach(function(ctx, idx) {
      num = idx;
    });
    expect(!isNaN(num)).to.equal(true);
    expect(typeof num === 'number').to.equal(true);
  });

  it('$("p").each(idx, ctx) should loop over all DOMStack items once.', function() {
    var num = undefined;
    var len = 0;
    $("p").each(function(idx, ctx) {
      num = idx;
      len += idx;
    });
    expect(num).to.equal(2);
    expect(len).to.equal($("p").length);
  });

  it('$("p").each(idx, ctx) should expose DOM nodes as context.', function() {
    var nodes = [];
    $("p").each(function(idx, ctx) {
      if (ctx.nodeType === 1) {
        nodes.push(ctx);
      }
    });
    expect(nodes.length).to.equal(3);
  });

  it('$("p").each(idx, ctx) should expose index value of iteration.', function() {    var num = undefined;
    $("p").each(function(idx, ctx) {
      num = idx;
    });
    expect(!isNaN(num)).to.equal(true);
    expect(typeof num === 'number').to.equal(true);
  });

  it('$("p").slice() should return all nodes in the DOMStack.', function() {
    var p = $('p').slice();
    expect(p.length).to.equal(3);
  });

  it('$("p").slice(start) should return DOMStack with slice of DOM nodes from start to end of DOMStack.', function() {
    var p = $('p').slice(1);
    expect(p.length).to.equal(2);
    expect(p.eq(0).text()).to.equal('p 2');
    expect(p.eq(1).text()).to.equal('p 3');
  });

  it('$("p").slice(-1) should return last item of DOMStack.', function() {
    var p = $('p').slice(-1);
    expect(p.length).to.equal(1);
    expect(p.text()).to.equal('p 3');
  });

  it('$("p").slice(-2) should return next to last item of DOMStack to last item.', function() {
    var p = $('p').slice(-2);
    expect(p.length).to.equal(2);
    expect(p.eq(0).text()).to.equal('p 2');
    expect(p.eq(1).text()).to.equal('p 3');
  });

  it('$("p").slice(1, 2) should return array with slice of DOM node from positions 1 to 2 (second node).', function() {
    var p = $('p').slice(1, 2);
    expect(p.length).to.equal(1);
    expect(p.text()).to.equal('p 2');
  });

  it('$("p").splice(1) should remove all items after first.', function() {
    var p = $("p");
    expect(p.length).to.equal(3);
    p.splice(1);
    expect(p.length).to.equal(1);
    expect(p.text()).to.equal('p 1');
  });

  it('$("p").splice(-1) should remove the last item.', function() {
    var p = $("p");
    expect(p.length).to.equal(3);
    expect(p.eq(-1).text()).to.equal('p 3');
    /* Splice the last item */
    p.splice(-1);
    expect(p.eq(-1).text()).to.not.equal('p 3');
    expect(p.length).to.equal(2);
    expect(p.eq(-1).text()).to.equal('p 2');
  });

  it('$("p").splice(1, 1) should remove the second item, so that third item is now second item.', function() {
    var p = $('p');
    p.splice(1, 1);
    expect(p.length).to.equal(2);
    expect(p.eq(1).text()).to.equal('p 3');
  });

  it('$("p").splice(1, 1) should return the spliced node.', function() {
    var p = $('p').splice(1, 1);
    expect(p.length).to.equal(1);
    expect(p.text()).to.equal('p 2');
  });

  it('$("p").splice(1, 0, node) should insert node at specified position, increasing length by 1.', function() {
    var p = $('p');
    p.splice(1, 0, $('<p>New Paragraph!</p>'));
    expect(p.length).to.equal(4);
    expect(p.eq(1).text()).to.equal('New Paragraph!');
  });

  it('$("p").splice(1, 1, node) should replace node at position 1.', function() {
    var p = $('p');
    p.splice(1, 1, $('<p>New Paragraph!</p>'));
    expect(p.length).to.equal(3);
    expect(p.eq(1).text()).to.equal('New Paragraph!');
  });

  it('$("p").filter(predicate) should loop over DOMStack.', function() {
    var p = $('p');
    var idx = 0;
    p.filter(function(ctx, i) {
      idx += i;
    });
    expect(idx).to.equal(3);
  });

  it('$("p").filter(predicate) should expose nodes in DOMStack.', function() {
    var p = $('p');
    var ret = p.filter(function(ctx, i) {
      return ctx.nodeType == 1;
    });
    expect(ret.length).to.equal(3);
  });

  it('$("p").filter(predicate) should expose index of loop.', function() {
    var p = $('p');
    var idx = [];
    var ret = p.filter(function(ctx, i) {
      idx.push(i);
    });
    expect(idx.length).to.equal(3);
    expect(idx.reduce(function(a, b) {
      return a + b;
    })).to.equal(3);
  });

  it('$("p").filter(predicate) should return DOMStack with matches.', function() {
    var p = $('p');
    var ret = p.filter(function(ctx, i) {
      return ctx.classList.contains('filterTest');
    });
    expect(ret.length).to.equal(1);
    expect(ret.hasClass('filterTest')).to.equal(true);
  });

  it('$("p").map(predicate) should loop over DOMStack.', function() {
    var p = $('p');
    var idx = 0;
    p.map(function(ctx, i) {
      idx += i;
    });
    expect(idx).to.equal(3);
  });

  it('$("p").map(predicate) should expose nodes in DOMStack.', function() {
    var p = $('p');
    var ret = p.map(function(ctx, i) {
      return ctx.nodeType == 1;
    });
    expect(ret.length).to.equal(3);
  });

  it('$("p").map(predicate) should expose index of loop.', function() {
    var p = $('p');
    var idx = [];
    var ret = p.map(function(ctx, i) {
      idx.push(i);
    });
    expect(idx.length).to.equal(3);
    expect(idx.reduce(function(a, b) {
      return a + b;
    })).to.equal(3);
  });

  it('$(elements).indexOf(node) should return index of element.', function() {
    var p = $('p');
    /* Setup tests */
    var index1 = p.indexOf(p[0]);
    var index2 = p.indexOf(p.eq(1)[0]);
    var index3 = p.indexOf(p.eq(2)[0]);
    /* Check tests */
    expect(index1).to.equal(0);
    expect(index2).to.equal(1);
    expect(index3).to.equal(2);
  });

  it('$(elements).indexOf(DOMStack) should return index of element.', function() {
    var p = $('p');
    /* Setup tests */
    var index1 = p.indexOf(p.eq(0));
    var index2 = p.indexOf(p.eq(1));
    var index3 = p.indexOf(p.eq(2));
    /* Check tests */
    expect(index1).to.equal(0);
    expect(index2).to.equal(1);
    expect(index3).to.equal(2);
  });

  it('$(elements).indexOf([node]) should return index of element.', function() {
    var p = $('p');
    /* Setup tests */
    var index1 = p.indexOf([p[0]]);
    var index2 = p.indexOf([p.eq(1)[0]]);
    var index3 = p.indexOf([p.eq(2)[0]]);
    /* Check tests */
    expect(index1).to.equal(0);
    expect(index2).to.equal(1);
    expect(index3).to.equal(2);
  });

  it('$(elements).indexOf(selector) should return index of element.', function() {
    var p = $('p');
    /* Setup tests */
    var index1 = p.indexOf('p:first-of-type');
    var index2 = p.indexOf('p:last-of-type');
    /* Should fail */
    var index3 = p.indexOf('li');
    /* Check tests */
    expect(index1).to.equal(0);
    expect(index2).to.equal(2);
    /* Fail should return -1 */
    expect(index3).to.equal(-1);
  });

  it('$("p").concat(DOMStack) allows you to concat one stack into another.', function() {
    var p = $('p');
    var p2 = $('<p>4</p><p>5</p><p>6</p>');
    p.concat(p2);
    expect(p.length).to.equal(6);
    expect(p.eq(0).text()).to.equal('p 1');
    expect(p.eq(1).text()).to.equal('p 2');
    expect(p.eq(2).text()).to.equal('p 3');
    expect(p.eq(3).text()).to.equal('4');
    expect(p.eq(4).text()).to.equal('5');
    expect(p.eq(5).text()).to.equal('6');
  });

  it('$("p").reverse() should reverse the DOMStack.', function() {
    var p = $('p');
    p.reverse();
    expect(p.eq(0).text()).to.equal('p 3');
    expect(p.eq(1).text()).to.equal('p 2');
    expect(p.eq(2).text()).to.equal('p 1');
  });

  it('$("p").every(function(node) { return node.nodeName === "P";}) should return true.', function() {
    var p = $('p');
    var result = p.every(function(node) {
      return node.nodeName === 'P';
    })
    expect(result).to.equal(true);
  });

  it('$("p").every(function(node) { return node.classList.contains("filterTest");}) should return false, because not all have the class.', function() {
    var p = $('p');
    var result = p.every(function(node) {
      return node.classList.contains("filterTest");
    })
    expect(result).to.equal(false);
  });

  it('$("p").some(function(node) { return node.classList.contains("filterTest");}) should return true because one P has that class.', function() {
    var p = $('p');
    var result = p.some(function(node) {
      return node.classList.contains("filterTest");
    })
    expect(result).to.equal(true);
  });

  it('$("p").unique() should remove reduce nodes to single instance of the tag type.', function() {
    var p = $('p');
     before(function() {
      p.unique();
      expect(p.length).to.equal(1);
      var li = $('li');
      li.unique();
      expect(li.length).to.equal(1);
     });
  });

  it('$("p").get() should return all the nodes in the DOMStack.', function() {
    var p = $('p');
    var nodes = p.get();
    var result = [];
    nodes.forEach(function(node) {
      if (node.nodeType === 1) {
        result.push(node);
      }
    })
    expect(nodes.length).to.equal(3);
    expect(nodes.length).to.equal(3);
  });

  it('$("p").getData() should return all the nodes in the DOMStack.', function() {
    /* This is a deprecated method. Use `get()` instead. */
    var p = $('p');
    var nodes = p.getData();
    var result = [];
    nodes.forEach(function(node) {
      if (node.nodeType === 1) {
        result.push(node);
      }
    })
    expect(nodes.length).to.equal(3);
    expect(nodes.length).to.equal(3);
  });

  it('var p = $("p"); p.purge() should delete all items from DOMStack.', function() {
    var p = $('p');
    var li = $('li');
    expect(p.length).to.equal(3);
    chai.assert.isAbove(li.length, 0);
    p.purge();
    li.purge();
    expect(p.length).to.equal(0);
    expect(li.length).to.equal(0);
  });


});



