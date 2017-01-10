describe("Serialize Tests", function () {

  it("$(form).serialize() should serialize a form's data.", function() {
    
    var params = $('form').serialize();

    /* Serialize form */
    expect(params).to.equal('name=Joe&age=32&job=mechanic&check=checkbox1&textarea=Some%20text%20here%20as%20well.');
  })

  it("$(form).serializeArray() should encode a form's elements as an array of names and values.", function() {

    var params = $('form').serializeArray();
  })

});