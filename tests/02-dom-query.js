describe("DOM Query Tests", function () {

  it('$(function() {}) should fire when DOM is ready.', function(done) {
    /**
     * Run DOM ready function.
     * Append element with id `new-element`.
     * Then retrieve it to see if it exists.
     */
    $(function() {
      $('#HTML-tests').append('<div id="new-element"></div>');
      if ($("#new-element")[0].id === 'new-element') {
        done();
      } else {
        done('Function did not execute when the DOM was ready.');
      }
    })
  });

  it('$("h5") should return h5 tag.', function() {
    /* The node should be an h5 */
    expect($("h5")[0].nodeName).to.equal('H5');
    /* The length should be 1 */
    expect($("h5").length).to.equal(1);
    /* There should only be one node */
    expect($("h5").eq(3)[0]).to.equal(undefined);
    /* Check the text inside the h5 */
    expect($("h5")[0].textContent).to.equal('The Title');
  });

  it('$("#someStuff") should return element with id of `someStuff`.', function() {
    /* The node should be a div */
    expect($('#someStuff')[0].nodeName).to.equal('DIV');
    /* The node should have an id of `someStuff` */
    expect($('#someStuff')[0].id).to.equal('someStuff');
    /* Check the text of the node */
    expect($('#someStuff')[0].textContent).to.equal('Stuff');
    /* The length should be 1 */
    expect($('#someStuff').length).to.equal(1);
    /* There should only be one node */
    expect($('#someStuff').eq(3)[0]).to.equal(undefined);
  });

  it('$(".whatever") should return element with class of `whatever`.', function() {
    /*  */
    expect($(".whatever")[0].nodeName).to.equal('DIV');
    /*  */
    expect($(".whatever")[0].classList.contains('whatever')).to.equal(true);
    /* The length should be 1 */
    expect($(".whatever").length).to.equal(1);
    /* There should only be one node */
    expect($(".whatever").eq(3)[0]).to.equal(undefined);
    /* Check the text of the node */
    expect($(".whatever")[0].textContent).to.equal('This is whatever');
  });

  it('$(".listItem") show return three list items with the class `listItem`.', function() {
    /* The length should be 3 */
    expect($(".listItem").length).to.equal(3);
    /* First list item */
    expect($(".listItem").eq(0)[0].nodeName).to.equal('LI');
    /* Second list item */
    expect($(".listItem").eq(1)[0].nodeName).to.equal('LI');
    /* Third list item */
    expect($(".listItem").eq(2)[0].nodeName).to.equal('LI');
    /* There should only be one node */
    expect($(".listItem").eq(6)[0]).to.equal(undefined);
  })

  it('$("[hidden]") should return element with attribute of `hidden`.', function() {
    /*  */
    expect($("[hidden]")[0].nodeName).to.equal('INPUT');
    /* The length should be 1 */
    expect($("[hidden]").length).to.equal(1);
    /* There should only be one node */
    expect($("[hidden]").eq(3)[0]).to.equal(undefined);
    /* Check the value of the node */
    expect($("[hidden]")[0].value).to.equal('hidden input');
  });

  it('$() should return an empty DOMStack.', function() {
    /* There should not be a node */
    expect($()[0]).to.equal(undefined);
    /* Length should be 0 */
    expect($().length).to.equal(0);
  });

  it('$(document) should return the document object.', function() {
    /* Should return the document object */
    expect($(document)[0]).to.equal(document);
    /* The length should be 1 */
    expect($(document).length).to.equal(1);
    /* There should only be one document */
    expect($(document).eq(3)[0]).to.equal(undefined);
  });

  it('$("<p>This is a new P.</p>") should create P node.', function() {
    /* The node should be a div */
    expect($("<p>This is a new P.</p>")[0].nodeName).to.equal('P');
    /* The length should be 1 */
    expect($("<p>This is a new P.</p>").length).to.equal(1);
    /* There should only be one node */
    expect($("<p>This is a new P.</p>").eq(3)[0]).to.equal(undefined);
    /* Check text content of P */
    expect($("<p>This is a new P.</p>")[0].textContent).to.equal('This is a new P.');
  });

  it('$("<p>One.</p><p>Two</p>") should create two P nodes.', function() {
    /* The length should be 2 */
    expect($("<p>One.</p><p>Two</p>").length).to.equal(2);
    /* The first node should be a P tag */
    expect($("<p>One.</p><p>Two</p>").eq(0)[0].nodeName).to.equal('P');
    /* The second node should be a P tag */
    expect($("<p>One.</p><p>Two</p>").eq(1)[0].nodeName).to.equal('P');
    /* There should only be two nodes */
    expect($("<p>One.</p><p>Two</p>").eq(3)[0]).to.equal(undefined);
  });

});