describe("Array Extras Tests", function () {

  it('Array.prototype.find(predicate) should find match.', function() {
    /* Find object in array */
    var people = [
        { name: 'Joe', job: 'mechanic' },
        { name: 'Ellen', job: 'lab technician' },
        { name: 'Sam', job: 'manager' },
        { name: 'Dave', job: 'developer' },
        { name: 'Mary', job: 'human resources' }
    ];
    /* Return object if match */
    var sam = people.find(function(person) {
        return person.name === 'Sam';
    });
    /* Check result name */
    expect(sam.name).to.equal('Sam');
    /* Check result job */
    expect(sam.job).to.equal('manager');
    /* Result should be an object */
    expect($.type(sam)).to.equal('object');
    /* Result should not be an array */
    chai.assert.notEqual($.type(sam), 'array');
  });

  it('Array.prototype.findIndex(predicate) should find match.', function() {
    /* Get the index of an object in array */
    var people = [
        { name: 'Joe', job: 'mechanic' },
        { name: 'Ellen', job: 'lab technician' },
        { name: 'Sam', job: 'manager' },
        { name: 'Dave', job: 'developer' },
        { name: 'Mary', job: 'human resources' }
    ];
    var index1 = people.findIndex(function(person) {
        return person.name === 'Sam';
    });
    var index2 = people.findIndex(function(person) {
        return person.name === 'Mary';
    })
    /* Test value of index1 */
    expect(index1).to.equal(2);
    /* Test type of index1 */
    expect($.type(index1)).to.equal('number');
    /* Test value of index2 */
    expect(index2).to.equal(4);
  });

  it('Array.prototype.pluck(property) should return array of all property values.', function() {
    var people = [
        { name: 'Joe', job: 'mechanic' },
        { name: 'Ellen', job: 'lab technician' },
        { name: 'Sam', job: 'manager' },
        { name: 'Dave', job: 'developer' },
        { name: 'Mary', job: 'human resources' }
    ];
    var names = people.pluck('name');
    var jobs = people.pluck('job')
    /* Test */
    expect(names.length).to.equal(5);
    /* Test */
    expect(names.join(' ')).to.equal('Joe Ellen Sam Dave Mary');
    /* Test */
    expect(jobs.length).to.equal(5);
    /* Test */
    expect(jobs.join(' ')).to.equal('mechanic lab technician manager developer human resources');
  });

  it('Array.prototype.difference(array) should return objects not in passed array.', function() {
    /* Find objects in people1 not in people2: */
    var people1 = [
      {name: 'Sam'},
      {name: 'Howard'},
      {name: 'Joe'}
    ];
    var people2 = [
      {name: 'Sam'},
      {name: 'Joe'}
    ];
    /* Compare people2 with people1 */
    var differences = people1.difference(people2);
    /* Test results length */
    expect(differences.length).to.equal(1);
    /* Test results value*/
    expect(differences[0].name).to.equal('Howard');
  });

  it('Array.prototype.intersection(array) should find shared objects of both arrays.', function() {
    /* Find objects shared by both arrays */
    var people1 = [
      {name: 'Sam'},
      {name: 'Howard'},
      {name: 'Joe'},
      {name: 'Anne'}
    ];
    var people2 = [
      {name: 'Sam'},
      {name: 'Tom'},
      {name: 'Joe'}
    ];
    var shared = people1.intersection(people2);
    /* Test */
    expect(shared.length).to.equal(2);
    /* Test */
    expect(shared[0].name).to.equal('Sam');
    /* Test */
    expect(shared[1].name).to.equal('Joe');
  });

  it('Array.prototype.mixin(arrray) should mixin provided array.', function() {
    /* Mixed in array should not add objects that already exist in target array */
    var people1 = [
      {name: 'Sam'},
      {name: 'Howard'},
      {name: 'Joe'},
      {name: 'Anne'}
    ];
    var people2 = [
      {name: 'Phil'},
      {name: 'Sam'},
      {name: 'Tom'},
      {name: 'Joe'}
    ];
    /* Test people1 values */
    var names = people1.pluck('name');
    expect(names.join(' ')).to.equal('Sam Howard Joe Anne');
    /* Length before mixin */
    expect(people1.length).to.equal(4);
    /* After mixin */
    people1.mixin(people2);
    /* Test mixed length */
    expect(people1.length).to.equal(6);
    /* Test mixed in values */
    names = people1.pluck('name');
    expect(names.join(' ')).to.equal('Sam Howard Joe Anne Phil Tom');
    /* Test */
    expect().to.equal();
  });

  it('Array.prototype.unique() should eliminate duplicates in array.', function() {
    /* Remove duplicates from arrays */
    var nums = [1,1,1,2,2,3,3,3,4,5,5,6,7,7,8,9,9];
    var people = [
      {name: 'Joe'},
      {name: 'Anne'},
      {name: 'Anne'},
      {name: 'Howard'},
      {name: 'Howard'},
      {name: 'Joe'},
      {name: 'Tom'},
      {name: 'Joe'},
      {name: 'Joe'},
      {name: 'Anne'},
      {name: 'Sam'},
      {name: 'Sam'},
      {name: 'Tom'},
      {name: 'Anne'},
      {name: 'Tom'}
    ];

    /* Test before unique */
    expect(nums.length).to.equal(17);
    /* Test value before unique */
    expect(nums.join('')).to.equal("11122333455677899")
    nums.unique();
    /* Test new length */
    expect(nums.length).to.equal(9);
    /* Test value */
    expect(nums.join('')).to.equal('123456789');
    /* Test before unique */
    expect(people.length).to.equal(15);
    /* Test values before unique */
    var values = people.pluck('name');
    expect(values.join(' ')).to.equal('Joe Anne Anne Howard Howard Joe Tom Joe Joe Anne Sam Sam Tom Anne Tom');
    /* Remove duplicate people */
    people.unique();
    /* Test new length */
    expect(people.length).to.equal(5);
    var names = people.pluck('name');
    /* Test new values */
    expect(names.join(' ')).to.equal('Joe Anne Howard Tom Sam');
  });


});