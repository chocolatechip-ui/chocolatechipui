describe("Collection Utilities Tests", function () {

  it('$(selector).forEach(callback)', function() {

    /* Test forEach loop on DOMStack */
    var li = $('#myList li');
    var ret = [];
    var index = [];
    li.forEach(function(li, idx) {
      ret.push(li);
      index.push(idx);
    });
    expect(ret.length).to.equal(5);
    expect(index.length).to.equal(5);
    expect(index.join(' ')).to.equal('0 1 2 3 4');
    expect(ret[0].textContent).to.equal('One');
    expect(ret[1].textContent).to.equal('Two');
    expect(ret[2].textContent).to.equal('Three');
    expect(ret[3].textContent).to.equal('Four');
    expect(ret[4].textContent).to.equal('Five');
  });

  it('$(selector).disable() should disable inputs.', function() {
    var input = $('input');
    /* Check that input is not disabled */
    expect(input[0]["disabled"]).to.equal(false);
    expect(input[0].classList.contains('disabled')).to.equal(false);
    /* Check that input is disabled */
    input.disable();
    expect(input[0]["disabled"]).to.equal(true);
    expect(input[0].classList.contains('disabled')).to.equal(true);
  });

  it('$(selector).enable() should enable inputs', function() {
    $('input').disable();
    var input = $('input');
    /* Test that input is disabled */
    expect(input[0]["disabled"]).to.equal(true);
    expect(input[0].classList.contains('disabled')).to.equal(true);
    $('input').enable();
    /* Test that input is enabled */
    expect(input[0]["disabled"]).to.equal(false);
    expect(input[0].classList.contains('disabled')).to.equal(false);
  });

  it('$(selector).iz(test) should return matches.', function() {
    var bodyTag = $('#bodyTag');
    var li = $('#myList li');
    var input = $('input');
    /* iz tag */
    expect(bodyTag.iz('body')[0].nodeName).to.equal('BODY');
    /* iz id */
    expect(bodyTag.iz('#bodyTag')[0].id).to.equal('bodyTag');
    /* iz class */
    expect(li.iz('.listItem').length).to.equal(3);
    expect(li.iz('.something').length).to.equal(2);
    /* iz attribute */
    expect(input.iz('[hidden]')[0].nodeName).to.equal('INPUT');
  });

  it('$(selector).iznt(test) should return matches.', function() {
    var bodyTag = $('#bodyTag');
    var li = $('#myList li');
    var input = $('input');
    /* iznt tag */
    var check1 = bodyTag.iznt('h5');
    expect(check1.length).to.equal(1);
    expect(check1[0].nodeName).to.equal('BODY');
    /* iznt id */
    var check2 = li.iznt('#bodyTag');
    expect(check2.length).to.equal(5);
    expect(check2[0].nodeName).to.equal('LI');
    var check3 = bodyTag.iznt('#bodyTag');
    expect(check3.objectType).to.equal('domstack');
    expect(check3[0]).to.equal(undefined);
    /* iznt class */
    var check4 = input.iznt('.listItem');
    expect(check4.length).to.equal(1);
    expect(check4[0].nodeName).to.equal('INPUT');
    expect(check4.val()).to.equal('hidden input');
    /* iznt attribute */
    var check5 = bodyTag.iznt('[hidden]');
    expect(check5.length).to.equal(1);
    expect(check5[0].nodeName).to.equal('BODY');
  });

  it('$(selector).haz(test) should return matches.', function() {
    var ul = $('#myList');
    /* haz child of tag */
    var check1 = ul.haz('li');
    expect(check1.length).to.equal(1);
    expect(check1[0].nodeName).to.equal('UL');
    /* haz child of id */
    var check2 = ul.haz('#special-item');
    expect(check2.length).to.equal(1);
    expect(check2[0].nodeName).to.equal('UL');
    /* haz child of class */
    var check3 = ul.haz('.listItem');
    expect(check3.length).to.equal(1);
    expect(check3[0].nodeName).to.equal('UL');
    /* haz child of attribute */
    var check4 = ul.haz('[data-my-stuff]');
    expect(check4.length).to.equal(1);
    expect(check4[0].nodeName).to.equal('UL');
  });

  it('$(selector).haznt(test) should return matches.', function() {
    var ul = $('#myList');
    /* haznt child of tag */
    var check1 = ul.haznt('p');
    expect(check1.length).to.equal(1);
    expect(check1[0].nodeName).to.equal('UL');
    /* Since UL has LI, will return empty */
    var check2 = ul.haznt('li');
    expect(check2.length).to.equal(0);
    /* haznt child of id */
    var check3 = ul.haznt('#fakeId');
    expect(check3.length).to.equal(1);
    expect(check3[0].nodeName).to.equal('UL');
    /* haznt child of class */
    var check4 = ul.haznt('.fakeClass');
    expect(check4.length).to.equal(1);
    expect(check4[0].nodeName).to.equal('UL');
    /* haznt child of attribute */
    var check5 = ul.haznt('[fakeAttr]');
    expect(check5.length).to.equal(1);
    expect(check5[0].nodeName).to.equal('UL');
  });

  it('$(selector).hazClass(test) should return matches.', function() {
    var li1 = $('.listItem');
    var li2 = $('.something');
    /* hazClass */
    var check1 = li1.hazClass('something');
    var check2 = li2.hazClass('something');
    var check3 = li1.hazClass('listItem');
    expect(check1.length).to.equal(0);
    expect(check2.length).to.equal(2);
    expect(check3.length).to.equal(3);
  });

  it('$(selector).hazntClass(test) should return matches.', function() {
    var li1 = $('.listItem');
    var li2 = $('.something');
    /* hazntClass */
    var check1 = li1.hazntClass('something');
    var check2 = li2.hazntClass('listItem');
    var check3 = li1.hazntClass('listItem');
    expect(check1.length).to.equal(3);
    expect(check2.length).to.equal(2);
    expect(check3.length).to.equal(0);
  });

  it('$(selector).hazAttr(test) should return matches.', function() {
    var input = $('input');
    var ul = $('#myList');
    /* hazAttr */
    var check1 = input.hazAttr('hidden');
    expect(check1.length).to.equal(1);
    expect(check1[0].nodeName).to.equal('INPUT');
    var check2 = ul.hazAttr('role');
    expect(check2.length).to.equal(1);
    expect(check2[0].nodeName).to.equal('UL');
    /* Should fail */
    var check3 = input.hazAttr('role');
    expect(check3[0]).to.equal(undefined);
  });

  it('$(selector).hazAttr(test) should return matches.', function() {
    var input = $('input');
    var ul = $('#myList');
    var check1 = input.hazntAttr('role');
    var check2 = ul.hazntAttr('hidden');
    /* hazntAttr */
    expect(check1.length).to.equal(1);
    expect(check1[0].nodeName).to.equal('INPUT');
    expect(check2.length).to.equal(1);
    expect(check2[0].nodeName).to.equal('UL');
  });
});

