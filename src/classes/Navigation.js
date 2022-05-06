const getInput = require('../utils/get-input');

class Navigation {
  stepHirarchy = [];
  values = {};
  currentStep = null;

  constructor() {
    const navigationConfig = require('../navigation');

    this.navigationStep(navigationConfig);
  };

  handleAction(action, step) {
    if (action.type) {
      this.navigationStep(action);

      return;
    }

    if (action[this.values[step.key]]) {
      action[this.values[step.key]](this.values);

      return;
    }

    console.log('no idea what youre trying to do');
  }

  handleSelectStep(step) {
    let options;

    if (typeof step.options === 'function') {
      options = step.options(this.values);
    } else {
      options = step.options;
    }

    if (options.length === 0) {
      console.log('no options');
      this.up();

      return;
    }

    options.forEach(({ name }, index) => {
      console.log(`${index + 1}: ${name}`);
    });

    console.log(`0: Up`);

    getInput().then((input) => {
      if (input === '0') {
        this.up();

        return;
      }

      const option = options[Number(input) - 1];

      if (option) {
        this.values[step.key] = option.value;
        this.handleAction(step.action, step);

        return;
      }

      console.log('invalid option');
      this.navigationStep(step);
    });
  }

  navigationStep(step, up) {
    console.log('-'.repeat(process.stdout.columns));
    console.log(step.title);
    console.log('');

    if (this.currentStep && !up) {
      this.stepHirarchy.push(this.currentStep);
    }

    this.currentStep = step;

    switch (step.type) {
      case 'select':
        this.handleSelectStep(step);

        break;
    }
  };

  up() {
    const step = this.stepHirarchy.pop();

    if (step) {
      this.navigationStep(step, true);
    }
  };
}

module.exports = Navigation;
