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
    var allElements = $('#test-part .fields');

    $(allElements[2]).insertBefore($(allElements[0])).trigger('sortableLabel:refresh');

    $('#test-part label').each(function(index, item) {
    	expect($(item).html()).toBe('Step '+String(index+1));
    });

    var expectedIdList = '3124',
    		targetIdList = '';
    $('#test-part .fields').each(function(index, item) {
    	targetIdList += String($(item).attr('id'));
    });
    expect(targetIdList).toBe(expectedIdList);

    var expectedPositionFieldVal = '1234',
        targetPositionFieldVal = '';
    $('#test-part .fields .position-field').each(function(index, item) {
      targetPositionFieldVal += $(item).val();
    });
    expect(targetPositionFieldVal).toBe(expectedPositionFieldVal);

  });

  // 'Day' label test
  it("sortable options label is Day", function() {
  	var weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  	$('#test-part').sortableLabel({
  		label: "Day"
  	});  
    var allElements = $('#test-part .fields.ui-sortable-handle');
  	$(allElements[2]).insertBefore($(allElements[0])).trigger('sortableLabel:refresh');
  	$('#test-part label').each(function(index, item) {
    	expect($(item).html()).toBe(weekday[index]);
    });
    var expectedIdList = '3124',
    		targetIdList = '';
    $('#test-part .fields').each(function(inedx, item) {
    	targetIdList += String($(item).attr('id'));
    });
    var expectedPositionFieldVal = '1234',
        targetPositionFieldVal = '';
    $('#test-part .fields .position-field').each(function(index, item) {
      targetPositionFieldVal += $(item).val();
    });
    expect(targetPositionFieldVal).toBe(expectedPositionFieldVal);
  });

  // Add and delete label test
  it("has deleted label", function() {
  	$('#test-part .fields').last().append("<div class='fields' id='5'><label></label><a class='remove_nested_fields' data-association='test_field'></a><input id='5_destroy' value='false'><input class='position-field'></div>");

  	$('#test-part').sortableLabel({
      fieldName: "test_field"
    });

    $('#test-part #3_destroy').val('1');
  	$($('.fields')[3]).css('display', 'none');

  	$('#test-part').trigger('sortableLabel:refresh');

  	$('#test-part label:visible').each(function(index, item) {
  		expect($(item).html()).toBe('Step '+String(index+1));
  	});
    var expectedIdList = '1245',
    		targetIdList = '';
    $('#test-part .fields:visible').each(function(inedx, item) {
    	targetIdList += String($(item).attr('id'));
    });
    console.log($('#test-part').html());
    var expectedPositionFieldVal = '1234',
        targetPositionFieldVal = '';
    $('#test-part .position-field').each(function(index, item) {
      targetPositionFieldVal += $(item).val();
    });
    expect(targetPositionFieldVal).toBe(expectedPositionFieldVal);
  });

  // Nested label test
  it("nested objects", function() {
    $('#test-part2').sortableLabel({
      fieldName: 'test_field2',
      labelTarget: 'label[rel=2]',
      nestedTarget: function() {
        $('.test-part3').sortableLabel({
          fieldName: 'nested_test_field',
          labelTarget: 'label[rel=3]'
        });
      }      
    });

    var allElements = $('.test-part3 .fields');
    $(allElements[2]).insertBefore($(allElements[0])).trigger('sortableLabel:refresh');

    var expectedParentId = '1234',
        targetParentId = '';

    $('#test-part2 > .fields').each(function(index, item) {
      targetParentId += $(item).attr('id');
    });

    expect(targetParentId).toBe(expectedParentId);

     var expectedNestedId = '31241234',
        targetNestedId = '';

    $('.test-part3 > .fields').each(function(index, item) {
      targetNestedId += $(item).attr('id');
    });

    expect(targetNestedId).toBe(expectedNestedId);   

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