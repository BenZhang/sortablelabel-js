describe("default config test", function() {
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath="base/spec/javascripts/fixtures";
    loadFixtures("sortable_default.html");
  });

  // Standard test
  it("default config sortable test", function() {
    $('#test-part').sortableLabel({
      fieldName: "test_field"
    });
    var allElements = $('#test-part .fields'),
        expectedIdList = ['3', '1', '2', '4'];

    $(allElements[2]).insertBefore($(allElements[0])).trigger('sortableLabel:refresh');

    // Label text test
    $('#test-part label').each(function(index, item) {
    	expect($(item).html()).toBe('Step '+String(index+1));
    });

    // Is sorted
    $('#test-part .fields').each(function(index, item) {
    	expect($(item).attr('id')).toBe(expectedIdList[index]);
    });

    // Position field test
    $('#test-part .fields .position-field').each(function(index, item) {
      expect($(item).val()).toBe(String(index+1));
    });
  });

  // 'Day' label test
  it("sortable options label is Day", function() {
  	var weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  	$('#test-part').sortableLabel({
  		label: "Day",
      fieldName: "test_field"
  	});  
    var allElements = $('#test-part .fields'),
        expectedIdList = ['3', '1', '2', '4'];

  	$(allElements[2]).insertBefore($(allElements[0])).trigger('sortableLabel:refresh');

    // Label text test
  	$('#test-part label').each(function(index, item) {
    	expect($(item).html()).toBe(weekday[index]);
    });

    // Is sorted
    $('#test-part .fields').each(function(index, item) {
    	expect($(item).attr('id')).toBe(expectedIdList[index]);
    });
    
    // Position field test
    $('#test-part .fields .position-field').each(function(index, item) {
      expect($(item).val()).toBe(String(index+1));
    });
  });

  // Add label test
  it("Add new label", function() {

  	$('#test-part').sortableLabel({
      fieldName: "test_field"
    });

    $('#test-part').append("<div class='fields' id='5'><label></label><a class='remove_nested_fields' data-association='test_field'></a><input id='5_destroy' value='false'><input class='position-field'></div>").trigger('sortableLabel:refresh');

    // Label text test
  	$('#test-part label:visible').each(function(index, item) {
  		expect($(item).html()).toBe('Step '+String(index+1));
  	});

    // Is sorted
    $('#test-part .fields:visible').each(function(index, item) {
      expect(String($(item).attr('id'))).toBe(String(index+1));
    });

    // Position field test
    $('#test-part .position-field:visible').each(function(index, item) {
      expect($(item).val()).toBe(String(index+1));
    });
  });

  // Delete label test
  it("Delete label", function() {

    $('#test-part5').sortableLabel({
      fieldName: "test_field"
    });

    $('#test-part5').trigger('sortableLabel:refresh');

    var expectedIdList = ['1', '3', '4'];

    // Label text test
    $('#test-part5 label:visible').each(function(index, item) {
      expect($(item).html()).toBe('Step '+String(index+1));
    });
    
    // Is sorted
    $('#test-part5 .fields:visible').each(function(index, item) {
      expect(String($(item).attr('id'))).toBe(expectedIdList[index]);
    });

    // Position field test
    $('#test-part5 .position-field:visible').each(function(index, item) {
      expect($(item).val()).toBe(String(index+1));
    });
  });

  // Nested label test
  it("nested objects", function() {
    $('#test-part2').sortableLabel({
      fieldName: 'test_field2',
      labelTarget: 'label[rel=2]',
      nestedTarget: function() {
        $('.test-part3').sortableLabel({
          fieldName: 'nested_test_field',
          labelTarget: 'label[rel=3]',
          positionTarget: '.nested_position-field'
        });
      }      
    });

    var allElements = $('.test-part3 .fields'),
        expectedNestedId = ['3', '1', '2', '4', '1', '2', '3', '4'];

    $(allElements[2]).insertBefore($(allElements[0])).trigger('sortableLabel:refresh');

    // Parent position field test & is sorted
    $('#test-part2 > .fields').each(function(index, item) {
      expect($(item).attr('id')).toBe(String(index+1));
      expect($(item).find('.position-field').val()).toBe(String(index+1));
    });

    $('.test-part3 > .fields').each(function(index, item) {
      expect($(item).attr('id')).toBe(expectedNestedId[index]);
      expect($(item).find('.nested_position-field').val()).toBe(String((index)%4+1));
    });

  });

  // Workout group label test

  // it("workout group label", function() {
  //   $('#test-part4').sortableLabel({
  //     fieldName: 'test_field',
  //     labelTarget: 'label[rel=m]',
  //     weekGroupLabelTarget: '.test_group_label'
  //   });

  //   var allElements = $('#test-part4 .fields');
  //   $(allElements[2]).insertBefore($(allElements[0])).trigger('sortableLabel:refresh');

  //   var expectedWorkoutGroupId = '3124',
  //       targetWorkoutGroupId = '',
  //       expectedGroupLabel = 'A 1A 2B 1B 2',
  //       targetGroupLabel = '';

  //   $('#test-part4 .test_group_label').each(function(index, item) {
  //     targetWorkoutGroupId += $(item).attr('id');
  //     targetGroupLabel += $(item).text();
  //   });

  //   expect(targetWorkoutGroupId).toBe(expectedWorkoutGroupId);
  //   expect(targetGroupLabel).toBe(expectedGroupLabel);
  // });
});