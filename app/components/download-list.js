import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { alias, equal } from '@ember/object/computed';

export default Component.extend({
  classNames: 'download-list',

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('selected', A());
  },

  availableFiles: computed('files.[].status', function() {
    return this.files.filterBy('status', 'available');
  }),

  selectedCount: alias('selected.length'),
  fileCount: alias('files.length'),
  availableFileCount: alias('availableFiles.length'),

  selectAllDisabled: equal('availableFileCount', 0),

  someSelected: computed('fileCount', 'selectedCount', function () {
    return this.selectedCount && this.selectedCount < this.availableFileCount;
  }),

  allSelected: computed('fileCount', 'selectedCount', function () {
    return this.selectedCount === this.availableFileCount;
  }),

  noneSelected: computed('selectedCount', function () {
    return !this.selectedCount;
  }),

  selectAllCheckedState: computed('selectedCount', 'allSelected', 'noneSelected', function() {
    if (this.someSelected) {
      return 'indeterminate';
    }
    if (this.allSelected) {
      return 'selected';
    }
    if(!this.selectedCount) {
      return 'unselected';
    }
  }),

  actions: {
    downloadSelected() {
      alert(this.selected.map((file) => `Device: ${file.device} Path: ${file.path}`).join('/n'))
    },

    selectFile(file) {
      if (file.status === 'available') {
        this.selected.addObject(file);
      } else {
        alert('This file is unavailable for download.')
      }
    },

    deselectFile(file) {
      this.selected.removeObject(file);
    },

    toggleSelectAll() {
      if (this.allSelected) {
        this.selected.removeObjects(this.files);
      } else {
        this.selected.addObjects(this.availableFiles);
      }
    },

    deselectAllFiles() {
      this.selected.clear();
    }
  }

});
