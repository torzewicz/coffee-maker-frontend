const ALERT_LEVEL = 0.05;

export class MixingContainer {

    constructor(ingredients) {
        this.coffeeLevel = ingredients.currentCoffeeLevel;
        this.sugarLevel = ingredients.currentSugarLevel;
        this.milkLevel = ingredients.currentMilkLevel;

        this.onIngredientsAddedHandler = () => {
        };
        this.onWaterAddedHandler = () => {
        };
        this.onCompletedCallback = () => {
        };
    }


    onIngredientsAdded(handler) {
        this.onIngredientsAddedHandler = handler;
    }

    onWaterAdded(handler) {
        this.onWaterAddedHandler = handler;
    }

    onCompleted(handler) {
        this.onCompletedCallback = handler;
    }

    makeCoffee(coffeeObject) {

        const ingredients = coffeeObject.ingredients;

        const newCoffeeLevel = this.coffeeLevel - ingredients.coffee;
        const newSugarLevel = this.sugarLevel - ingredients.sugar;
        const newMilkLevel = this.milkLevel - ingredients.milk;

        if (newCoffeeLevel < 0) {
            // TODO: Send alert
        } else if (newSugarLevel < 0) {
            // TODO: Send alert
        } else if (newMilkLevel < 0) {
            // TODO: Send alert
        } else {

            setTimeout(() => {
                let remainingIngredients = {
                    currentCoffeeLevel: newCoffeeLevel,
                    currentSugarLevel: newSugarLevel,
                    currentMilkLevel: newMilkLevel
                };
                this.onIngredientsAddedHandler(remainingIngredients)

                console.log("Ingredients added to mixing container");
                console.log("Pouring water started");


                setTimeout(() => {

                    console.log("Completed pouring water");
                    this.onCompletedCallback()


                }, 6000)


            }, 2000)

        }


    }

}

