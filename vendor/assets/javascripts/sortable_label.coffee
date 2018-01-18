class @SortableLabel

  defaults =
    sortableItem: '> div.fields'
    labelTarget: 'label'
    positionTarget: '.position-field'
    nestedTarget: null
    removeField: "input[id$='_destroy']"
    label: 'Step '
    minimun: 0

  constructor: (scope, options) ->
    @options   = $.extend({}, defaults, options)
    @target    = scope
    @targetId  = @options['fieldName'] || @target.attr('id')
    @callback  = @options["callback"]
    @calInitStepLable()

    $(document).on("nested:fieldAdded:#{@targetId}", (event) =>
      @calStepLable()
      if @options['nestedTarget']
        @options['nestedTarget'].call(@target)
    )

    $(document).on("nested:fieldRemoved:#{@targetId}", (event) =>
      @calStepLable()
    )

    @target.on('sortableLabel:refresh', =>
      @target.sortable("enable")
      @calStepLable()
    )

    if @options['nestedTarget']
      @options['nestedTarget'].call(@target)

    @target.sortable(
      items: @options['sortableItem']
      placeholder: "ui-state-highlight"
      start: (event, ui)->
        $(this).find('.ui-state-highlight').css('height', $(ui.item).css('height'))        
      stop: =>
        @calStepLable()
    )

    @target.on('sortableLabel:disable', =>
      @target.sortable('disable')
    )

  calInitStepLable: ->
    this.calLabel(this.options['removeField']+'[value=false]')
    if this.options['weekGroupLabelTarget']
      this.calWeekGroupLabel(this.options['weekGroupLabelTarget'])

  calStepLable: ->
    this.calLabel(this.options['removeField']+'[value=false]')
    if this.options['weekGroupLabelTarget']
      this.calWeekGroupLabel(this.options['weekGroupLabelTarget'])

  calLabel: (target) ->
    _this = this
    $(@target).each(->
      stepCount = 1
      $(this).find(target).each( ->
        if($(this).closest('.fields').find('.remove_nested_fields').data('association') == _this.options['fieldName'])
          if _this.options['minimun'] >= stepCount
            $(this).closest('.fields').find('.remove_nested_fields').hide();
          else
            $(this).closest('.fields').find('.remove_nested_fields').show();
          $(this).closest('.fields').find(_this.options['positionTarget']).val(stepCount)
          if typeof(_this.options['label']) == 'string'
            if _this.options['label'].trim() == 'Day'       
              $(this).closest('.fields').find(_this.options['labelTarget']).html(_this.dayOfWeek(stepCount - 1))  
            else
              if _this.options['fieldName']
                if $(this).parent().find('.remove_nested_fields').data('association') == _this.options['fieldName']
                  $(this).closest('.fields').find(_this.options['labelTarget']).html(_this.options['label'] + stepCount)
              else
                alert("Field name can't be empty!")
          else if typeof(_this.options['label']) == 'function'
            $(this).closest('.fields').find(_this.options['labelTarget']).html(_this.options['label'].call($(this).closest('.fields').find(_this.options['labelTarget']), stepCount))
          stepCount += 1
      )      
    )
    if typeof(@callback) == 'function'
      @callback();

  calWeekGroupLabel: (target) ->
    _this = this
    week_group_label_list = []
    $(@target).each(->
      $(this).find(target).each(->
        tempLabel = $(this).closest('.fields').find('.workout_workout_weeks_workout_week_group_id select').find(":selected").text()
        if $(this).closest('.fields').find('.workout_workout_weeks_workout_week_group_id select').find(":selected").val() != ""
          _index = _this.isIncludeWeekGroup(tempLabel, week_group_label_list)
          if _index is -1
            week_group_label_list.push(
              name: tempLabel,
              count: 1
            )
            if typeof _this.options['subPositionTarget'] == 'string'
              $(this).closest('.fields').find(_this.options['subPositionTarget']).val(1)
            if typeof _this.options['groupLabel'] == 'string'
              $(this).html("<i class='fa fa-trophy fa-fw small-opacity-30'></i>" + tempLabel + " " + _this.options['groupLabel'] + " 1")
            else
              $(this).html("<i class='fa fa-trophy fa-fw small-opacity-30'></i>" + tempLabel)
          else if _index > -1
            week_group_label_list[_index].count += 1
            if typeof _this.options['subPositionTarget'] == 'string'
              $(this).closest('.fields').find(_this.options['subPositionTarget']).val(week_group_label_list[_index].count)
            if typeof _this.options['groupLabel'] == 'string'
              $(this).html("<i class='fa fa-trophy fa-fw small-opacity-30'></i>" + tempLabel + " " + _this.options['groupLabel'] + " " + week_group_label_list[_index].count)
            else
              $(this).html("<i class='fa fa-trophy fa-fw small-opacity-30'></i>" + tempLabel)
        else
          $(this).html("<i class='fa fa-trophy fa-fw small-opacity-30'></i>")
      )
    )

  isIncludeWeekGroup: (item, arr)->
    if item == " " || item.trim() == ""
      return -2
    for _item, index in arr
      return index if _item.name is item
    return -1

  dayOfWeek: (dayIndex) ->
    ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dayIndex]

(($) ->
  $.fn.sortableLabel = (options) ->
    new SortableLabel(this, options)
)(jQuery)