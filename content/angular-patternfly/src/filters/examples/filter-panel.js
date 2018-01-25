/**
 * @ngdoc directive
 * @name patternfly.filters.component:pfFilterPanel
 * @restrict E
 *
 * @description
 *   The Filter Panel is opened and closed by clicking on the Filter button.  It can contain any HTML desired by
 *   the application developer.  As such, the application developer is repsonsible for constructing the <code>appliedFilters</code> array which is passed to
 *   the filter results tags.
 *   The application developer is responsible for filtering items based on the <code>appliedFilters</code> array; both when a
 *   filter is changed on the panel, or when a filter tag is 'cleared' (by user clicking on 'x' in the filter results tag).
 *   <br>
 *
 * @param {object} config configuration settings for the filters:<br/>
 * <ul style='list-style-type: none'>
 * <li>.appliedFilters - (Array) List of the currently applied filters. Used to render the filter results tags and returned
 * in the <code>onFilterChange</code> function where it can be used to filter a set of items.
 * <ul style='list-style-type: none'>
 * <li>.id          - (String) Id for the filter, useful for comparisons
 * <li>.title       - (String) The title to display for the filter results tag
 * <li>.values      - (Array) The value(s) to display for the filter results tag. Ie. [title: [value1 x] [value2 x]]
 * </ul>
 * <li>.resultsCount   - (int) The number of results returned after the current applied filters have been applied
 * <li>.totalCount     - (int) The total number of items before any filters have been applied. The 'm' in the label: 'n' of 'm'
 * <li>.resultsLabel   - (String) Optional label for the result units.  Default is "Results".  Ex: "'n' of 'm' Results"
 * <li>.onFilterChange - ( function(appliedFilters, changedFilterId, changedFilterValue) ) Function to call when the applied
 * filters list changes.  Triggered by user clicking on 'x' or 'Clear All Filters' in the filter result tags.
 * <code>changedFilterId</code> and <code>changedFilterValue</code> are returned after user clicks on an 'x' in a tag to
 * denote which filter and filter value was cleared.  <code>changedFilterId</code> and <code>changedFilterValue</code> are
 * not returned when 'Clear All Filters' link is clicked.
 * </ul>
 *
 * @example
<example module="patternfly.filters">
  <file name="index.html">
    <div ng-controller="ViewCtrl" class="row example-container">
      <div class="col-md-12">
        <pf-filter-panel id="exampleFilter" config="filterConfig">
          <div class="filter-panel-container">
            <input type="text" ng-model="filterPanelModel[0].value"
                   class="keyword-filter"
                   placeholder="{{filterPanelModel[0].placeholder}}"
                   ng-keypress="onKeywordKeyPress($event)"/>
            <div class="category" ng-repeat="filter in filterPanelModel" ng-if="!$first">{{filter.title}}
              <ul>
                <li ng-repeat="value in filter.values">
                  <input type="checkbox" ng-model="value.selected" ng-change="filterChanged()"/>
                  <span class="category-option-label">{{value.title}}</span>
                </li>
              </ul>
            </div>
          </div>
        </pf-filter-panel>
      </div>
      <hr class="col-md-12">
      <div class="col-md-12">
        <label class="events-label">Valid Items: </label>
      </div>
      <div class="col-md-12">
        <div class="col-md-12 cfme-row-column">
          <div class="row">
            <div class="col-xs-3 col-md-2"><b>ID</b></div>
            <div class="col-xs-3 col-md-2"><b>Keyword</b></div>
            <div class="col-xs-3 col-md-4"><b>Category One</b></div>
            <div class="col-sx-3 col-md-4"><b>Category Two</b></div>
          </div>
        </div>
        <div ng-repeat="item in items" class="col-md-12 cfme-row-column">
          <div class="row">
             <div class="col-xs-3 col-md-2">
               <span>{{item.id}}</span>
            </div>
            <div class="col-xs-3 col-md-2">
              <span>{{item.keyword}}</span>
            </div>
            <div class="col-xs-3 col-md-4">
              <span>{{item.categoryOne}}</span>
            </div>
            <div class="col-xs-3 col-md-4">
              <span>{{item.categoryTwo}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </file>

  <file name="script.js">
    angular.module('patternfly.filters').controller('ViewCtrl', ['$scope',
      function ($scope) {
        $scope.filterPanelModel = [
          {
            id: 'keyword',
            title:  'Keyword',
            placeholder: 'Filter by Keyword',
            filterType: 'input',
            values: []
          },
          {
            id: 'category1',
            title:  'Category One',
            filterType: 'checkbox',
            values: [
              {
                id: 'val1',
                title: 'Value 1',
                value: 'Value 1',
                selected: false
              },
              {
                id: 'val2',
                title: 'Value 2',
                value: 'Value 2',
                selected: false
              },
              {
                id: 'val3',
                title: 'Value 3',
                value: 'Value 3',
                selected: false
              }
            ]
          },
          {
            id: 'category2',
            title:  'Category Two',
            filterType: 'checkbox',
            values: [
              {
                id: 'val1',
                title: 'Value 1',
                value: 'Value 1',
                selected: false
              },
              {
                id: 'val2',
                title: 'Value 2',
                value: 'Value 2',
                selected: false
              },
              {
                id: 'val3',
                title: 'Value 3',
                value: 'Value 3',
                selected: false
              }
            ]
          }
        ];

        $scope.filtersText = '';

        $scope.allItems = [
          {
            id: "1",
            keyword: "Foo",
            categoryOne: "Value 1",
            categoryTwo: "Value 1"
          },
          {
            id: "2",
            keyword: "Bar",
            categoryOne: "Value 2",
            categoryTwo: "Value 1"
          },
          {
            id: "3",
            keyword: "Foo",
            categoryOne: "Value 3",
            categoryTwo: "Value 1"
          },
          {
            id: "4",
            keyword: "Bar",
            categoryOne: "Value 1",
            categoryTwo: "Value 2"
          },
          {
            id: "5",
            keyword: "Foo",
            categoryOne: "Value 2",
            categoryTwo: "Value 2"
          },
          {
            id: "6",
            keyword: "Bar",
            categoryOne: "Value 3",
            categoryTwo: "Value 2"
          },
          {
            id: "7",
            keyword: "Foo",
            categoryOne: "Value 1",
            categoryTwo: "Value 3"
          },
          {
            id: "8",
            keyword: "Bar",
            categoryOne: "Value 2",
            categoryTwo: "Value 3"
          },
          {
            id: "9",
            keyword: "Foo",
            categoryOne: "Value 3",
            categoryTwo: "Value 3"
          }
        ];
        $scope.items = $scope.allItems;

        // called when filter cleared by hitting 'x' in filter results tag, or 'Clear All Filters' link
        var onFilterChange = function (appliedFilters, changedFilterId, changedFilterValue) {
          if (angular.isDefined(changedFilterId) && angular.isDefined(changedFilterValue)) {
            updateFilterPanelModel(changedFilterId, changedFilterValue);
          } else {
            // the 'Clear All Filters' link was clicked
            resetFilterPanelModel();
          }
          // filter items
          filterItems(appliedFilters);
        };

        $scope.filterConfig = {
          resultsLabel: "Items",
          resultsCount: $scope.items.length,
          totalCount: $scope.allItems.length,
          appliedFilters: [],
          onFilterChange: onFilterChange
        };

        // called when filter is changed in the filter panel
        $scope.filterChanged = function() {
          applyFilters();
        };

        $scope.onKeywordKeyPress = function(keyEvent) {
          if (keyEvent.which === 13 && $scope.filterPanelModel[0].value.length > 0) {
            // store new keywoard filter value in values array
            $scope.filterPanelModel[0].values.push($scope.filterPanelModel[0].value);
            // remove the keyword value to show placeholder text
            delete $scope.filterPanelModel[0].value;
            applyFilters();
          }
        };

        var applyFilters = function () {
          var newAppliedFilters = [];
          _.forEach($scope.filterPanelModel, function(filter) {
            var filterValues = [];
            if (angular.isDefined(filter.values) && filter.values.length > 0) {
              if(filter.filterType === "checkbox") {
                // the values of the selected checkboxes are stored in a single new appliedFilter
                _.forEach(filter.values, function(value) {
                  if(value.selected) {
                    filterValues.push(value.value)
                  }
                });
                if (filterValues.length > 0) {
                  newAppliedFilters.push( createAppliedFilter (filter, filterValues) );
                }
              } else {
                // each keyword value gets a new appliedFilter
                _.forEach(filter.values, function(value) {
                  filterValues = [value];
                  newAppliedFilters.push( createAppliedFilter (filter, filterValues) );
                });
              }
            }
          });

          // sets the filter result tags
          $scope.filterConfig.appliedFilters = newAppliedFilters;
          // filter items
          filterItems($scope.filterConfig.appliedFilters);
        };

        var createAppliedFilter = function(filter, values) {
          return {
                    id: filter.id,
                    title: filter.title,
                    values: values
                 };
        };

        var updateFilterPanelModel = function (changedFilterId, changedFilterValue) {
          var changedFilter = _.find($scope.filterPanelModel, function(f) { return f.id === changedFilterId});
          if(changedFilter.filterType === "checkbox") {
             // unselect the checkbox
             _.find(changedFilter.values, function(v) {return v.value == changedFilterValue}).selected = false;
          } else {
             // remove keyword from values array
             _.remove(changedFilter.values, function(v) {return v == changedFilterValue});
          }
        };

        var resetFilterPanelModel = function () {
          _.forEach($scope.filterPanelModel, function(filter) {
            if (angular.isDefined(filter.values) && filter.values.length > 0) {
              if(filter.filterType === "checkbox") {
                // unselect all checkboxes
                filter.values.forEach(function (value) {
                  value.selected = false;
                });
              } else {
                // clear all keyword filter values
                filter.values = [];
              }
            }
          });
        };

        var filterItems = function (filters) {
          $scope.items = [];
          if (filters && filters.length > 0) {
           _.forEach($scope.allItems, function(item) {
              if (matchesFilters(item, filters)) {
                $scope.items.push(item);
              }
            });
          } else {
            $scope.items = $scope.allItems;
          }
          $scope.filterConfig.resultsCount = $scope.items.length;
        };

        var matchesFilters = function (item, filters) {
          var matches = true;

          _.forEach(filters, function(filter) {
              if (!matchesFilter(item, filter)) {
                matches = false;
                return false;
              }
          });
          return matches;
        };

        var matchesFilter = function (item, filter) {
          var match = true;

          if (filter.id === 'keyword') {
            var re = new RegExp(filter.values[0], 'i');
            match = item.keyword.match(re) !== null;
          } else if (filter.id === 'category1') {
            // values are OR'ed
            _.forEach(filter.values, function(value) {
              match = item.categoryOne === value;
              return !match;
            });
          } else if (filter.id === 'category2') {
            // values are OR'ed
            _.forEach(filter.values, function(value) {
              match = item.categoryTwo === value;
              return !match;
            });
          }
          return match;
        };
      }
    ]);
  </file>
</example>
*/
