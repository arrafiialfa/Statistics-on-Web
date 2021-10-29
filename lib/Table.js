class Table {
  constructor(arrayX, arrayY) {
    this.arrayX = arrayX;
    this.arrayY = arrayY;

    //array x variables
    this.xSquaredDetails = [];
    this.xDeviationDetails = [];
    this.xDeviationSquaredDetails = [];

    //array y variables
    this.ySquaredDetails = [];
    this.yDeviationDetails = [];
    this.yDeviationSquaredDetails = [];

    //array x&y
    this.productDeviationDetails = [];
    this.xyDetails = [];

    this.init();
  }

  //return array of each item squared in the arrayX
  getSquaredDetails(key) {
    switch (key) {
      case "x":
        return this.xSquaredDetails;
      case "y":
        return this.ySquaredDetails;
    }
  }

  //get sum of each item
  getSum(key) {
    let sum = 0;
    switch (key) {
      case "x":
        for (const x of this.arrayX) {
          sum = sum + x;
        }

        break;

      case "y":
        for (const y of this.arrayY) {
          sum = sum + y;
        }
        break;

      default:
        console.error("Invalid key");
        break;
    }

    return sum;
  }

  //get sum of each item squared
  getSquaredSum(key) {
    let squaredSum = 0;
    switch (key) {
      case "x":
        for (const x of this.arrayX) {
          squaredSum = squaredSum + Math.pow(x, 2);
          this.xSquaredDetails.push(Math.pow(x, 2));
        }

        break;

      case "y":
        for (const y of this.arrayY) {
          squaredSum = squaredSum + Math.pow(y, 2);
          this.ySquaredDetails.push(Math.pow(y, 2));
        }
        break;

      default:
        console.error("Invalid key");
        break;
    }

    return Math.round((squaredSum + Number.EPSILON) * 100) / 100;
  }

  //get mean of item
  getMean(key) {
    let length;

    switch (key) {
      case "x":
        length = this.arrayX.length;
        break;
      case "y":
        length = this.arrayY.length;
        break;
      default:
        console.error("Invalid key");
    }

    return Math.round((this.getSum(key) / length + Number.EPSILON) * 100) / 100;
  }

  //get each item deviation
  getDeviation(key) {
    switch (key) {
      case "x":
        for (const x of this.arrayX) {
          this.xDeviationDetails.push(
            Math.round((x - this.getMean(key) + Number.EPSILON) * 100) / 100
          );
        }

        return this.xDeviationDetails;

      case "y":
        for (const y of this.arrayY) {
          this.yDeviationDetails.push(
            Math.round((y - this.getMean(key) + Number.EPSILON) * 100) / 100
          );
        }
        return this.yDeviationDetails;

      default:
        console.error("Invalid key");
    }
  }

  //get sum of each item deviation squared
  getDeviationSquaredSum(key) {
    let deviationSquaredSum = 0;

    switch (key) {
      case "x":
        if (this.xDeviationDetails.length == 0) {
          this.getDeviation(key);
        }

        for (const x of this.xDeviationDetails) {
          deviationSquaredSum += Math.pow(x, 2);
          this.xDeviationSquaredDetails.push(Math.pow(x, 2));
        }
        break;
      case "y":
        if (this.yDeviationDetails.length == 0) {
          this.getDeviation(key);
        }

        for (const y of this.yDeviationDetails) {
          deviationSquaredSum += Math.pow(y, 2);
          this.yDeviationSquaredDetails.push(Math.pow(y, 2));
        }
        break;

      default:
        console.error("Invalid key");
    }

    return Math.round((deviationSquaredSum + Number.EPSILON) * 100) / 100;
  }

  //get sum of (x-xmean)(y-ymean)
  getProductDeviationSum() {
    let length;
    const productDeviationSum = 0;

    if (this.xDeviationDetails.length > this.yDeviationDetails) {
      length = this.yDeviationDetails.length;
    } else {
      length = this.xDeviationDetails.length;
    }

    for (let i = 0; i < length; i++) {
      const item = this.xDeviationDetails[i] * this.yDeviationDetails[i];
      productDeviationSum += item;

      this.productDeviationDetails.push(item);
    }

    return productDeviationSum;
  }

  getProductDeviationDetails() {
    return this.productDeviationDetails;
  }

  getXYSum() {
    let length;
    let xySum = 0;

    if (this.arrayX.length > this.arrayY.length) {
      length = this.arrayY.length;
    } else {
      length = this.arrayX.length;
    }

    for (let i = 0; i < length; i++) {
      const item = this.arrayX[i] * this.arrayY[i];
      xySum += item;
      this.xyDetails.push(item);
    }

    return xySum;
  }

  getXYDetails() {
    return this.xyDetails;
  }

  //return object of all calculation results
  init() {
    const obj = {
      sum: { x: this.getSum("x"), y: this.getSum("y") },
      squaredSum: { x: this.getSquaredSum("x"), y: this.getSquaredSum("y") },
      squared: {
        x: this.getSquaredDetails("x"),
        y: this.getSquaredDetails("y"),
      },
      mean: { x: this.getMean("x"), y: this.getMean("y") },
      deviation: { x: this.getDeviation("x"), y: this.getDeviation("y") },
      deviationSquaredSum: {
        x: this.getDeviationSquaredSum("x"),
        y: this.getDeviationSquaredSum("y"),
      },
      productDeviation: {
        productDeviationSum: this.getProductDeviationSum(),
        productDeviationDetails: this.getProductDeviationDetails(),
      },
      xy: {
        xySum: this.getXYSum(),
        xyDetails: this.getXYDetails(),
      },
    };

    return obj;
  }

  getTable() {
    const table = [];

    for (var i = 0; i < this.arrayX.length; i++) {
      const array = [
        this.arrayX[i],
        this.arrayY[i],
        this.xSquaredDetails[i],
        this.ySquaredDetails[i],
        this.xyDetails[i],
        Math.round((this.xDeviationSquaredDetails[i] + Number.EPSILON) * 100) /
          100,
        Math.round((this.yDeviationSquaredDetails[i] + Number.EPSILON) * 100) /
          100,
        Math.round((this.productDeviationDetails[i] + Number.EPSILON) * 100) /
          100,
      ];

      table.push(array);
    }

    return table;
  }

  getTableSum() {
    const table = [
      this.getSum("x"),
      this.getSum("y"),
      this.getSquaredSum("x"),
      this.getSquaredSum("y"),
      this.getXYSum(),
      this.getDeviationSquaredSum("x"),
      this.getDeviationSquaredSum("y"),
      Math.round((this.getProductDeviationSum() + Number.EPSILON) * 100) / 100,
    ];

    return table;
  }
}

export default Table;
