# Linear Regression: Simple and Multiple - Complete Guide

## Table of Contents
1. [Introduction to Linear Regression](#introduction)
2. [Mathematical Foundation](#mathematical-foundation)
3. [Simple Linear Regression](#simple-linear-regression)
4. [Multiple Linear Regression](#multiple-linear-regression)
5. [Assumptions of Linear Regression](#assumptions)
6. [Model Evaluation Metrics](#evaluation-metrics)
7. [Python Implementation Examples](#python-examples)
8. [Two Practical Problems with Different Approaches](#practical-problems)
9. [Advanced Topics](#advanced-topics)
10. [Common Pitfalls and Solutions](#common-pitfalls)

---

## 1. Introduction to Linear Regression {#introduction}

Linear regression is one of the most fundamental and widely used statistical techniques in machine learning and data science. It models the relationship between a dependent variable (target) and one or more independent variables (features) by fitting a linear equation to observed data.

### Why Linear Regression?

Linear regression serves multiple purposes:
- **Prediction**: Estimating unknown values of the dependent variable
- **Understanding relationships**: Quantifying how changes in independent variables affect the dependent variable
- **Feature importance**: Identifying which variables have the strongest impact
- **Baseline model**: Often used as a starting point for more complex models

### Types of Linear Regression

1. **Simple Linear Regression**: One independent variable predicts one dependent variable
2. **Multiple Linear Regression**: Multiple independent variables predict one dependent variable
3. **Multivariate Linear Regression**: Multiple independent variables predict multiple dependent variables

---

## 2. Mathematical Foundation {#mathematical-foundation}

### Simple Linear Regression Formula

The fundamental equation for simple linear regression is:

```
y = β₀ + β₁x + ε
```

Where:
- `y` = dependent variable (response)
- `x` = independent variable (predictor)
- `β₀` = y-intercept (constant term)
- `β₁` = slope coefficient
- `ε` = error term (residual)

### Multiple Linear Regression Formula

For multiple linear regression with p predictors:

```
y = β₀ + β₁x₁ + β₂x₂ + ... + βₚxₚ + ε
```

In matrix notation:
```
Y = Xβ + ε
```

Where:
- `Y` = vector of dependent variables (n×1)
- `X` = design matrix of independent variables (n×(p+1))
- `β` = vector of coefficients ((p+1)×1)
- `ε` = vector of error terms (n×1)

### Ordinary Least Squares (OLS) Method

The OLS method finds the coefficients that minimize the sum of squared residuals:

```
Minimize: RSS = Σᵢ(yᵢ - ŷᵢ)²
```

The analytical solution for coefficients is:
```
β̂ = (XᵀX)⁻¹XᵀY
```

### Gradient Descent Alternative

When dealing with large datasets or when the matrix inversion is computationally expensive, gradient descent can be used:

```
Cost Function: J(β) = (1/2m) * Σᵢ(hβ(xᵢ) - yᵢ)²
Update Rule: βⱼ := βⱼ - α * (∂J(β)/∂βⱼ)
```

---

## 3. Simple Linear Regression {#simple-linear-regression}

### Theoretical Background

Simple linear regression examines the linear relationship between two continuous variables. It assumes that the relationship can be adequately described by a straight line.

#### Key Concepts:

1. **Slope (β₁)**: Represents the change in y for a one-unit change in x
2. **Intercept (β₀)**: The value of y when x equals zero
3. **Correlation vs. Causation**: Linear regression shows association, not necessarily causation
4. **Linearity**: The relationship between variables should be approximately linear

#### Interpretation of Coefficients:

- If β₁ > 0: Positive relationship (as x increases, y increases)
- If β₁ < 0: Negative relationship (as x increases, y decreases)
- If β₁ = 0: No linear relationship

#### Statistical Significance:

To test if a coefficient is significantly different from zero:
- **Null Hypothesis (H₀)**: β₁ = 0 (no relationship)
- **Alternative Hypothesis (H₁)**: β₁ ≠ 0 (relationship exists)
- **Test Statistic**: t = β₁ / SE(β₁)

---

## 4. Multiple Linear Regression {#multiple-linear-regression}

### Theoretical Framework

Multiple linear regression extends simple linear regression to include multiple predictor variables. This allows us to control for confounding variables and understand the unique contribution of each predictor.

#### Key Concepts:

1. **Partial Coefficients**: Each βᵢ represents the change in y for a one-unit change in xᵢ, holding all other variables constant
2. **Multicollinearity**: When predictors are highly correlated with each other
3. **Overfitting**: Including too many predictors relative to sample size
4. **Feature Selection**: Choosing the most relevant predictors

#### Model Building Strategies:

1. **Forward Selection**: Start with no variables, add variables that improve the model
2. **Backward Elimination**: Start with all variables, remove non-significant ones
3. **Stepwise Selection**: Combination of forward and backward selection
4. **All Subsets**: Evaluate all possible combinations of predictors

---

## 5. Assumptions of Linear Regression {#assumptions}

Linear regression relies on several key assumptions. Violating these assumptions can lead to biased or inefficient estimates.

### 1. Linearity
The relationship between independent and dependent variables should be linear.

**Detection**: Residual plots, scatter plots
**Solutions**: Transform variables, polynomial regression, non-linear models

### 2. Independence
Observations should be independent of each other.

**Detection**: Durbin-Watson test, residual autocorrelation plots
**Solutions**: Time series models, clustering adjustments

### 3. Homoscedasticity (Constant Variance)
The variance of residuals should be constant across all levels of predictors.

**Detection**: Breusch-Pagan test, residual vs. fitted plots
**Solutions**: Transform dependent variable, weighted least squares, robust standard errors

### 4. Normality of Residuals
Residuals should follow a normal distribution.

**Detection**: Q-Q plots, Shapiro-Wilk test, histogram of residuals
**Solutions**: Transform variables, robust regression methods

### 5. No Multicollinearity
Independent variables should not be highly correlated.

**Detection**: Variance Inflation Factor (VIF), correlation matrix
**Solutions**: Remove correlated variables, principal component analysis, ridge regression

---

## 6. Model Evaluation Metrics {#evaluation-metrics}

### Coefficient of Determination (R²)
Measures the proportion of variance in the dependent variable explained by the model.

```
R² = 1 - (RSS/TSS)
where RSS = Σ(yᵢ - ŷᵢ)² and TSS = Σ(yᵢ - ȳ)²
```

**Interpretation**:
- R² = 0: Model explains no variance
- R² = 1: Model explains all variance
- Higher R² indicates better fit

### Adjusted R²
Adjusts R² for the number of predictors in the model.

```
Adjusted R² = 1 - [(1-R²)(n-1)/(n-p-1)]
```

**Use Case**: Comparing models with different numbers of predictors

### Mean Squared Error (MSE)
Average of squared differences between actual and predicted values.

```
MSE = (1/n) * Σ(yᵢ - ŷᵢ)²
```

### Root Mean Squared Error (RMSE)
Square root of MSE, interpretable in the same units as the dependent variable.

```
RMSE = √MSE
```

### Mean Absolute Error (MAE)
Average of absolute differences between actual and predicted values.

```
MAE = (1/n) * Σ|yᵢ - ŷᵢ|
```

---

## 7. Python Implementation Examples {#python-examples}

### Required Libraries

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.preprocessing import StandardScaler
import scipy.stats as stats
import warnings
warnings.filterwarnings('ignore')

# Set random seed for reproducibility
np.random.seed(42)
```

### Simple Linear Regression Example

```python
# Generate sample data
np.random.seed(42)
n_samples = 100
x = np.random.normal(50, 15, n_samples)
y = 2.5 * x + 10 + np.random.normal(0, 10, n_samples)  # y = 2.5x + 10 + noise

# Create DataFrame
data = pd.DataFrame({'x': x, 'y': y})

# Visualize the data
plt.figure(figsize=(10, 6))
plt.scatter(data['x'], data['y'], alpha=0.7, color='blue')
plt.xlabel('X (Independent Variable)')
plt.ylabel('Y (Dependent Variable)')
plt.title('Simple Linear Regression - Sample Data')
plt.grid(True, alpha=0.3)
plt.show()

# Fit the model
X = data[['x']]
y = data['y']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and fit the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred_train = model.predict(X_train)
y_pred_test = model.predict(X_test)

# Model coefficients
print(f"Intercept (β₀): {model.intercept_:.3f}")
print(f"Slope (β₁): {model.coef_[0]:.3f}")
print(f"Equation: y = {model.coef_[0]:.3f}x + {model.intercept_:.3f}")

# Model evaluation
train_r2 = r2_score(y_train, y_pred_train)
test_r2 = r2_score(y_test, y_pred_test)
train_rmse = np.sqrt(mean_squared_error(y_train, y_pred_train))
test_rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))

print(f"\nModel Performance:")
print(f"Training R²: {train_r2:.3f}")
print(f"Testing R²: {test_r2:.3f}")
print(f"Training RMSE: {train_rmse:.3f}")
print(f"Testing RMSE: {test_rmse:.3f}")

# Visualization with regression line
plt.figure(figsize=(12, 5))

# Training data
plt.subplot(1, 2, 1)
plt.scatter(X_train, y_train, alpha=0.7, color='blue', label='Training Data')
plt.plot(X_train, y_pred_train, color='red', linewidth=2, label='Regression Line')
plt.xlabel('X')
plt.ylabel('Y')
plt.title(f'Training Data (R² = {train_r2:.3f})')
plt.legend()
plt.grid(True, alpha=0.3)

# Testing data
plt.subplot(1, 2, 2)
plt.scatter(X_test, y_test, alpha=0.7, color='green', label='Testing Data')
plt.plot(X_test, y_pred_test, color='red', linewidth=2, label='Regression Line')
plt.xlabel('X')
plt.ylabel('Y')
plt.title(f'Testing Data (R² = {test_r2:.3f})')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

### Multiple Linear Regression Example

```python
# Generate sample data for multiple regression
np.random.seed(42)
n_samples = 200

# Create correlated features
x1 = np.random.normal(50, 15, n_samples)  # Feature 1
x2 = np.random.normal(30, 10, n_samples)  # Feature 2
x3 = x1 * 0.3 + np.random.normal(0, 5, n_samples)  # Feature 3 (correlated with x1)
x4 = np.random.normal(20, 8, n_samples)   # Feature 4

# Create target variable with known relationships
y = 2.5*x1 + 1.8*x2 + 0.5*x3 + 3.2*x4 + 50 + np.random.normal(0, 15, n_samples)

# Create DataFrame
data_multi = pd.DataFrame({
    'feature_1': x1,
    'feature_2': x2, 
    'feature_3': x3,
    'feature_4': x4,
    'target': y
})

# Display basic statistics
print("Dataset Statistics:")
print(data_multi.describe())

# Correlation matrix
plt.figure(figsize=(10, 8))
correlation_matrix = data_multi.corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('Correlation Matrix')
plt.show()

# Prepare features and target
X_multi = data_multi[['feature_1', 'feature_2', 'feature_3', 'feature_4']]
y_multi = data_multi['target']

# Split the data
X_train_multi, X_test_multi, y_train_multi, y_test_multi = train_test_split(
    X_multi, y_multi, test_size=0.2, random_state=42
)

# Fit multiple linear regression model
model_multi = LinearRegression()
model_multi.fit(X_train_multi, y_train_multi)

# Make predictions
y_pred_train_multi = model_multi.predict(X_train_multi)
y_pred_test_multi = model_multi.predict(X_test_multi)

# Model coefficients
print(f"\nMultiple Linear Regression Results:")
print(f"Intercept: {model_multi.intercept_:.3f}")
print(f"Coefficients:")
for i, coef in enumerate(model_multi.coef_):
    print(f"  Feature_{i+1}: {coef:.3f}")

# Model equation
equation = f"y = {model_multi.intercept_:.3f}"
for i, coef in enumerate(model_multi.coef_):
    equation += f" + {coef:.3f}*x{i+1}"
print(f"\nEquation: {equation}")

# Model evaluation
train_r2_multi = r2_score(y_train_multi, y_pred_train_multi)
test_r2_multi = r2_score(y_test_multi, y_pred_test_multi)
train_rmse_multi = np.sqrt(mean_squared_error(y_train_multi, y_pred_train_multi))
test_rmse_multi = np.sqrt(mean_squared_error(y_test_multi, y_pred_test_multi))

print(f"\nModel Performance (Multiple Regression):")
print(f"Training R²: {train_r2_multi:.3f}")
print(f"Testing R²: {test_r2_multi:.3f}")
print(f"Training RMSE: {train_rmse_multi:.3f}")
print(f"Testing RMSE: {test_rmse_multi:.3f}")

# Feature importance visualization
plt.figure(figsize=(10, 6))
feature_names = ['Feature_1', 'Feature_2', 'Feature_3', 'Feature_4']
coefficients = model_multi.coef_

plt.bar(feature_names, coefficients, color=['blue', 'green', 'red', 'orange'])
plt.xlabel('Features')
plt.ylabel('Coefficient Value')
plt.title('Feature Coefficients (Importance)')
plt.grid(True, alpha=0.3)
for i, v in enumerate(coefficients):
    plt.text(i, v + 0.1, f'{v:.2f}', ha='center', va='bottom')
plt.show()
```

### Model Diagnostics and Assumption Checking

```python
def check_linear_regression_assumptions(model, X_train, y_train, y_pred_train):
    """
    Check linear regression assumptions with visualizations
    """
    residuals = y_train - y_pred_train
    
    fig, axes = plt.subplots(2, 2, figsize=(15, 12))
    
    # 1. Residuals vs Fitted Values (Homoscedasticity)
    axes[0, 0].scatter(y_pred_train, residuals, alpha=0.7)
    axes[0, 0].axhline(y=0, color='red', linestyle='--')
    axes[0, 0].set_xlabel('Fitted Values')
    axes[0, 0].set_ylabel('Residuals')
    axes[0, 0].set_title('Residuals vs Fitted Values\n(Check for Homoscedasticity)')
    axes[0, 0].grid(True, alpha=0.3)
    
    # 2. Q-Q Plot (Normality of Residuals)
    stats.probplot(residuals, dist="norm", plot=axes[0, 1])
    axes[0, 1].set_title('Q-Q Plot\n(Check for Normality of Residuals)')
    axes[0, 1].grid(True, alpha=0.3)
    
    # 3. Histogram of Residuals
    axes[1, 0].hist(residuals, bins=20, density=True, alpha=0.7, color='skyblue')
    axes[1, 0].set_xlabel('Residuals')
    axes[1, 0].set_ylabel('Density')
    axes[1, 0].set_title('Distribution of Residuals')
    axes[1, 0].grid(True, alpha=0.3)
    
    # Add normal curve overlay
    x_norm = np.linspace(residuals.min(), residuals.max(), 100)
    y_norm = stats.norm.pdf(x_norm, residuals.mean(), residuals.std())
    axes[1, 0].plot(x_norm, y_norm, 'red', linewidth=2, label='Normal Distribution')
    axes[1, 0].legend()
    
    # 4. Residuals vs Index (Independence)
    axes[1, 1].scatter(range(len(residuals)), residuals, alpha=0.7)
    axes[1, 1].axhline(y=0, color='red', linestyle='--')
    axes[1, 1].set_xlabel('Observation Index')
    axes[1, 1].set_ylabel('Residuals')
    axes[1, 1].set_title('Residuals vs Index\n(Check for Independence)')
    axes[1, 1].grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()
    
    # Statistical tests
    print("Statistical Tests for Assumptions:")
    print("-" * 40)
    
    # Shapiro-Wilk test for normality
    shapiro_stat, shapiro_p = stats.shapiro(residuals)
    print(f"Shapiro-Wilk Test (Normality):")
    print(f"  Statistic: {shapiro_stat:.4f}")
    print(f"  p-value: {shapiro_p:.4f}")
    print(f"  Result: {'Residuals are normal' if shapiro_p > 0.05 else 'Residuals are not normal'}")
    
    # Durbin-Watson test for independence (approximation)
    dw_stat = np.sum(np.diff(residuals)**2) / np.sum(residuals**2)
    print(f"\nDurbin-Watson Test (Independence):")
    print(f"  Statistic: {dw_stat:.4f}")
    print(f"  Result: {'No autocorrelation' if 1.5 < dw_stat < 2.5 else 'Possible autocorrelation'}")

# Check assumptions for the multiple regression model
check_linear_regression_assumptions(model_multi, X_train_multi, y_train_multi, y_pred_train_multi)
```

---

## 8. Two Practical Problems with Different Approaches {#practical-problems}

### Problem 1: House Price Prediction (Analytical Approach)

This problem demonstrates the traditional analytical approach using normal equations and statistical inference.

```python
# Problem 1: House Price Prediction using Analytical Approach
print("=" * 60)
print("PROBLEM 1: HOUSE PRICE PREDICTION (ANALYTICAL APPROACH)")
print("=" * 60)

# Generate realistic house price data
np.random.seed(123)
n_houses = 500

# Features
size_sqft = np.random.normal(2000, 500, n_houses)  # House size in sq ft
bedrooms = np.random.poisson(3, n_houses)  # Number of bedrooms
age_years = np.random.exponential(15, n_houses)  # Age of house
garage_spaces = np.random.choice([0, 1, 2, 3], n_houses, p=[0.1, 0.3, 0.5, 0.1])

# Create realistic price relationship
base_price = 50000
price = (base_price + 
         100 * size_sqft +  # $100 per sq ft
         15000 * bedrooms + # $15k per bedroom
         -800 * age_years + # -$800 per year of age
         10000 * garage_spaces + # $10k per garage space
         np.random.normal(0, 25000, n_houses))  # Noise

# Ensure positive prices
price = np.maximum(price, 50000)

# Create DataFrame
house_data = pd.DataFrame({
    'size_sqft': size_sqft,
    'bedrooms': bedrooms,
    'age_years': age_years,
    'garage_spaces': garage_spaces,
    'price': price
})

print("House Price Dataset:")
print(house_data.describe())
print(f"\nDataset shape: {house_data.shape}")

# Analytical Approach Implementation
class AnalyticalLinearRegression:
    """
    Linear Regression using analytical solution (Normal Equation)
    """
    def __init__(self):
        self.coefficients = None
        self.intercept = None
        self.X_train = None
        self.y_train = None
        
    def fit(self, X, y):
        """Fit model using normal equation: β = (X'X)^-1 X'y"""
        # Add intercept term (column of ones)
        X_with_intercept = np.column_stack([np.ones(X.shape[0]), X])
        
        # Normal equation: β = (X'X)^-1 X'y
        XTX = np.dot(X_with_intercept.T, X_with_intercept)
        XTy = np.dot(X_with_intercept.T, y)
        
        # Solve for coefficients
        beta = np.linalg.solve(XTX, XTy)
        
        self.intercept = beta[0]
        self.coefficients = beta[1:]
        self.X_train = X.copy()
        self.y_train = y.copy()
        
        return self
    
    def predict(self, X):
        """Make predictions"""
        return self.intercept + np.dot(X, self.coefficients)
    
    def get_coefficient_statistics(self, X, y):
        """Calculate coefficient statistics"""
        n, p = X.shape
        
        # Add intercept
        X_with_intercept = np.column_stack([np.ones(n), X])
        
        # Predictions and residuals
        y_pred = self.predict(X)
        residuals = y - y_pred
        
        # Mean squared error
        mse = np.sum(residuals**2) / (n - p - 1)
        
        # Variance-covariance matrix
        XTX_inv = np.linalg.inv(np.dot(X_with_intercept.T, X_with_intercept))
        var_covar = mse * XTX_inv
        
        # Standard errors
        se = np.sqrt(np.diag(var_covar))
        
        # t-statistics
        all_coefs = np.concatenate([[self.intercept], self.coefficients])
        t_stats = all_coefs / se
        
        # p-values (two-tailed)
        p_values = 2 * (1 - stats.t.cdf(np.abs(t_stats), n - p - 1))
        
        return {
            'coefficients': all_coefs,
            'standard_errors': se,
            't_statistics': t_stats,
            'p_values': p_values,
            'mse': mse
        }

# Prepare data for analytical approach
X_house = house_data[['size_sqft', 'bedrooms', 'age_years', 'garage_spaces']].values
y_house = house_data['price'].values

# Split data
X_train_house, X_test_house, y_train_house, y_test_house = train_test_split(
    X_house, y_house, test_size=0.2, random_state=123
)

# Fit analytical model
analytical_model = AnalyticalLinearRegression()
analytical_model.fit(X_train_house, y_train_house)

# Get coefficient statistics
coef_stats = analytical_model.get_coefficient_statistics(X_train_house, y_train_house)

# Display detailed results
feature_names = ['Intercept', 'Size (sqft)', 'Bedrooms', 'Age (years)', 'Garage Spaces']
print(f"\nAnalytical Linear Regression Results:")
print("-" * 70)
print(f"{'Feature':<15} {'Coefficient':<12} {'Std Error':<12} {'t-stat':<10} {'p-value':<10}")
print("-" * 70)

for i, name in enumerate(feature_names):
    coef = coef_stats['coefficients'][i]
    se = coef_stats['standard_errors'][i]
    t_stat = coef_stats['t_statistics'][i]
    p_val = coef_stats['p_values'][i]
    significance = '***' if p_val < 0.001 else '**' if p_val < 0.01 else '*' if p_val < 0.05 else ''
    
    print(f"{name:<15} {coef:<12.2f} {se:<12.2f} {t_stat:<10.2f} {p_val:<10.4f} {significance}")

# Model evaluation
y_pred_train_house = analytical_model.predict(X_train_house)
y_pred_test_house = analytical_model.predict(X_test_house)

train_r2_house = 1 - np.sum((y_train_house - y_pred_train_house)**2) / np.sum((y_train_house - np.mean(y_train_house))**2)
test_r2_house = 1 - np.sum((y_test_house - y_pred_test_house)**2) / np.sum((y_test_house - np.mean(y_test_house))**2)

print(f"\nModel Performance:")
print(f"Training R²: {train_r2_house:.4f}")
print(f"Testing R²: {test_r2_house:.4f}")
print(f"Mean Squared Error: {coef_stats['mse']:.2f}")
print(f"RMSE: {np.sqrt(coef_stats['mse']):.2f}")

# Visualize predictions vs actual
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.scatter(y_train_house, y_pred_train_house, alpha=0.6, color='blue')
plt.plot([y_train_house.min(), y_train_house.max()], [y_train_house.min(), y_train_house.max()], 'r--', lw=2)
plt.xlabel('Actual Price')
plt.ylabel('Predicted Price')
plt.title(f'Training Set\n(R² = {train_r2_house:.4f})')
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 2)
plt.scatter(y_test_house, y_pred_test_house, alpha=0.6, color='green')
plt.plot([y_test_house.min(), y_test_house.max()], [y_test_house.min(), y_test_house.max()], 'r--', lw=2)
plt.xlabel('Actual Price')
plt.ylabel('Predicted Price')
plt.title(f'Testing Set\n(R² = {test_r2_house:.4f})')
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 3)
residuals_house = y_train_house - y_pred_train_house
plt.scatter(y_pred_train_house, residuals_house, alpha=0.6)
plt.axhline(y=0, color='red', linestyle='--')
plt.xlabel('Predicted Price')
plt.ylabel('Residuals')
plt.title('Residual Plot')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

### Problem 2: Student Performance Prediction (Gradient Descent Approach)

This problem demonstrates the iterative gradient descent approach, useful for large datasets.

```python
# Problem 2: Student Performance Prediction using Gradient Descent
print("\n" + "=" * 65)
print("PROBLEM 2: STUDENT PERFORMANCE PREDICTION (GRADIENT DESCENT)")
print("=" * 65)

# Generate student performance data
np.random.seed(456)
n_students = 1000

# Features
study_hours = np.random.gamma(2, 3, n_students)  # Hours studied per week
previous_grade = np.random.normal(75, 15, n_students)  # Previous grade
attendance_rate = np.random.beta(8, 2, n_students) * 100  # Attendance percentage
family_support = np.random.choice([0, 1], n_students, p=[0.3, 0.7])  # Family support (binary)
extracurricular = np.random.poisson(2, n_students)  # Number of extracurricular activities

# Create performance score relationship
performance = (
    30 +  # Base score
    3.5 * study_hours +
    0.4 * previous_grade +
    0.2 * attendance_rate +
    5 * family_support +
    1.5 * extracurricular +
    np.random.normal(0, 8, n_students)  # Noise
)

# Ensure scores are within reasonable range (0-100)
performance = np.clip(performance, 0, 100)

# Create DataFrame
student_data = pd.DataFrame({
    'study_hours': study_hours,
    'previous_grade': previous_grade,
    'attendance_rate': attendance_rate,
    'family_support': family_support,
    'extracurricular': extracurricular,
    'performance': performance
})

print("Student Performance Dataset:")
print(student_data.describe())
print(f"\nDataset shape: {student_data.shape}")

# Gradient Descent Implementation
class GradientDescentLinearRegression:
    """
    Linear Regression using Gradient Descent optimization
    """
    def __init__(self, learning_rate=0.01, max_iterations=1000, tolerance=1e-6):
        self.learning_rate = learning_rate
        self.max_iterations = max_iterations
        self.tolerance = tolerance
        self.coefficients = None
        self.intercept = None
        self.cost_history = []
        self.converged = False
        
    def _normalize_features(self, X):
        """Normalize features for better convergence"""
        mean = np.mean(X, axis=0)
        std = np.std(X, axis=0)
        X_normalized = (X - mean) / (std + 1e-8)  # Add small value to avoid division by zero
        return X_normalized, mean, std
    
    def _compute_cost(self, X, y, coefficients, intercept):
        """Compute mean squared error cost"""
        predictions = intercept + np.dot(X, coefficients)
        cost = np.mean((y - predictions) ** 2) / 2
        return cost
    
    def _compute_gradients(self, X, y, coefficients, intercept):
        """Compute gradients for coefficients and intercept"""
        m = X.shape[0]
        predictions = intercept + np.dot(X, coefficients)
        errors = predictions - y
        
        # Gradients
        coef_gradient = np.dot(X.T, errors) / m
        intercept_gradient = np.mean(errors)
        
        return coef_gradient, intercept_gradient
    
    def fit(self, X, y, verbose=False):
        """Fit model using gradient descent"""
        # Normalize features
        X_normalized, self.feature_mean, self.feature_std = self._normalize_features(X)
        
        # Initialize parameters
        n_features = X.shape[1]
        self.coefficients = np.random.normal(0, 0.01, n_features)
        self.intercept = 0
        
        # Gradient descent loop
        for iteration in range(self.max_iterations):
            # Compute cost
            cost = self._compute_cost(X_normalized, y, self.coefficients, self.intercept)
            self.cost_history.append(cost)
            
            # Compute gradients
            coef_grad, intercept_grad = self._compute_gradients(
                X_normalized, y, self.coefficients, self.intercept
            )
            
            # Update parameters
            new_coefficients = self.coefficients - self.learning_rate * coef_grad
            new_intercept = self.intercept - self.learning_rate * intercept_grad
            
            # Check for convergence
            if iteration > 0:
                cost_change = abs(self.cost_history[-2] - self.cost_history[-1])
                if cost_change < self.tolerance:
                    self.converged = True
                    if verbose:
                        print(f"Converged at iteration {iteration}")
                    break
            
            self.coefficients = new_coefficients
            self.intercept = new_intercept
            
            # Print progress
            if verbose and iteration % 100 == 0:
                print(f"Iteration {iteration}: Cost = {cost:.6f}")
        
        return self
    
    def predict(self, X):
        """Make predictions on new data"""
        X_normalized = (X - self.feature_mean) / (self.feature_std + 1e-8)
        return self.intercept + np.dot(X_normalized, self.coefficients)
    
    def plot_cost_history(self):
        """Plot the cost function over iterations"""
        plt.figure(figsize=(10, 6))
        plt.plot(self.cost_history, linewidth=2)
        plt.xlabel('Iteration')
        plt.ylabel('Cost (MSE)')
        plt.title('Cost Function During Training')
        plt.grid(True, alpha=0.3)
        plt.show()

# Prepare data for gradient descent approach
X_student = student_data[['study_hours', 'previous_grade', 'attendance_rate', 
                         'family_support', 'extracurricular']].values
y_student = student_data['performance'].values

# Split data
X_train_student, X_test_student, y_train_student, y_test_student = train_test_split(
    X_student, y_student, test_size=0.2, random_state=456
)

# Fit gradient descent model
gd_model = GradientDescentLinearRegression(learning_rate=0.01, max_iterations=2000)
gd_model.fit(X_train_student, y_train_student, verbose=True)

# Display convergence information
print(f"\nGradient Descent Results:")
print(f"Converged: {gd_model.converged}")
print(f"Final cost: {gd_model.cost_history[-1]:.6f}")
print(f"Total iterations: {len(gd_model.cost_history)}")

# Model coefficients
feature_names_student = ['Study Hours', 'Previous Grade', 'Attendance Rate', 
                        'Family Support', 'Extracurricular']
print(f"\nModel Coefficients:")
print(f"Intercept: {gd_model.intercept:.4f}")
for i, (name, coef) in enumerate(zip(feature_names_student, gd_model.coefficients)):
    print(f"{name}: {coef:.4f}")

# Make predictions
y_pred_train_student = gd_model.predict(X_train_student)
y_pred_test_student = gd_model.predict(X_test_student)

# Model evaluation
train_r2_student = r2_score(y_train_student, y_pred_train_student)
test_r2_student = r2_score(y_test_student, y_pred_test_student)
train_rmse_student = np.sqrt(mean_squared_error(y_train_student, y_pred_train_student))
test_rmse_student = np.sqrt(mean_squared_error(y_test_student, y_pred_test_student))

print(f"\nModel Performance (Gradient Descent):")
print(f"Training R²: {train_r2_student:.4f}")
print(f"Testing R²: {test_r2_student:.4f}")
print(f"Training RMSE: {train_rmse_student:.4f}")
print(f"Testing RMSE: {test_rmse_student:.4f}")

# Visualizations
plt.figure(figsize=(15, 10))

# Cost history
plt.subplot(2, 3, 1)
plt.plot(gd_model.cost_history, linewidth=2, color='blue')
plt.xlabel('Iteration')
plt.ylabel('Cost (MSE)')
plt.title('Gradient Descent Convergence')
plt.grid(True, alpha=0.3)

# Training predictions
plt.subplot(2, 3, 2)
plt.scatter(y_train_student, y_pred_train_student, alpha=0.6, color='blue')
plt.plot([y_train_student.min(), y_train_student.max()], 
         [y_train_student.min(), y_train_student.max()], 'r--', lw=2)
plt.xlabel('Actual Performance')
plt.ylabel('Predicted Performance')
plt.title(f'Training Set\n(R² = {train_r2_student:.4f})')
plt.grid(True, alpha=0.3)

# Testing predictions
plt.subplot(2, 3, 3)
plt.scatter(y_test_student, y_pred_test_student, alpha=0.6, color='green')
plt.plot([y_test_student.min(), y_test_student.max()], 
         [y_test_student.min(), y_test_student.max()], 'r--', lw=2)
plt.xlabel('Actual Performance')
plt.ylabel('Predicted Performance')
plt.title(f'Testing Set\n(R² = {test_r2_student:.4f})')
plt.grid(True, alpha=0.3)

# Feature importance
plt.subplot(2, 3, 4)
plt.bar(range(len(feature_names_student)), gd_model.coefficients, 
        color=['blue', 'green', 'red', 'orange', 'purple'])
plt.xlabel('Features')
plt.ylabel('Coefficient Value')
plt.title('Feature Importance')
plt.xticks(range(len(feature_names_student)), feature_names_student, rotation=45)
plt.grid(True, alpha=0.3)

# Residual plot
plt.subplot(2, 3, 5)
residuals_student = y_train_student - y_pred_train_student
plt.scatter(y_pred_train_student, residuals_student, alpha=0.6)
plt.axhline(y=0, color='red', linestyle='--')
plt.xlabel('Predicted Performance')
plt.ylabel('Residuals')
plt.title('Residual Plot')
plt.grid(True, alpha=0.3)

# Learning rate sensitivity analysis
plt.subplot(2, 3, 6)
learning_rates = [0.001, 0.01, 0.1, 0.5]
colors = ['blue', 'green', 'red', 'orange']

for lr, color in zip(learning_rates, colors):
    temp_model = GradientDescentLinearRegression(learning_rate=lr, max_iterations=500)
    temp_model.fit(X_train_student, y_train_student)
    plt.plot(temp_model.cost_history, label=f'LR={lr}', color=color, linewidth=2)

plt.xlabel('Iteration')
plt.ylabel('Cost')
plt.title('Learning Rate Sensitivity')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Compare with scikit-learn
sklearn_model = LinearRegression()
sklearn_model.fit(X_train_student, y_train_student)
sklearn_pred = sklearn_model.predict(X_test_student)
sklearn_r2 = r2_score(y_test_student, sklearn_pred)

print(f"\nComparison with Scikit-learn:")
print(f"Custom Gradient Descent R²: {test_r2_student:.4f}")
print(f"Scikit-learn R²: {sklearn_r2:.4f}")
print(f"Difference: {abs(test_r2_student - sklearn_r2):.6f}")
```

---

## 9. Advanced Topics {#advanced-topics}

### Regularization Techniques

Regularization helps prevent overfitting by adding a penalty term to the cost function.

#### Ridge Regression (L2 Regularization)

```python
from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler

# Ridge Regression Implementation
class RidgeRegression:
    """Ridge Regression with L2 regularization"""
    
    def __init__(self, alpha=1.0):
        self.alpha = alpha  # Regularization strength
        self.coefficients = None
        self.intercept = None
    
    def fit(self, X, y):
        # Add intercept term and solve regularized normal equation
        X_with_intercept = np.column_stack([np.ones(X.shape[0]), X])
        n_features = X_with_intercept.shape[1]
        
        # Ridge normal equation: (X'X + αI)β = X'y
        XTX = np.dot(X_with_intercept.T, X_with_intercept)
        identity = np.eye(n_features)
        identity[0, 0] = 0  # Don't regularize intercept
        
        regularized_XTX = XTX + self.alpha * identity
        XTy = np.dot(X_with_intercept.T, y)
        
        beta = np.linalg.solve(regularized_XTX, XTy)
        self.intercept = beta[0]
        self.coefficients = beta[1:]
        
        return self
    
    def predict(self, X):
        return self.intercept + np.dot(X, self.coefficients)

# Demonstrate regularization with varying alpha values
print("\nRidge Regression with Different Alpha Values:")
print("-" * 50)

alphas = [0.01, 0.1, 1.0, 10.0, 100.0]
ridge_results = []

for alpha in alphas:
    ridge = Ridge(alpha=alpha)
    ridge.fit(X_train_student, y_train_student)
    pred = ridge.predict(X_test_student)
    r2 = r2_score(y_test_student, pred)
    ridge_results.append((alpha, r2, ridge.coef_))
    print(f"Alpha = {alpha:6.2f}: R² = {r2:.4f}")

# Plot regularization path
plt.figure(figsize=(12, 8))

plt.subplot(2, 2, 1)
alphas_plot = [result[0] for result in ridge_results]
r2_scores = [result[1] for result in ridge_results]
plt.semilogx(alphas_plot, r2_scores, 'bo-', linewidth=2, markersize=8)
plt.xlabel('Alpha (Regularization Strength)')
plt.ylabel('R² Score')
plt.title('Ridge Regression: R² vs Alpha')
plt.grid(True, alpha=0.3)

plt.subplot(2, 2, 2)
coefficients_matrix = np.array([result[2] for result in ridge_results])
for i, feature in enumerate(feature_names_student):
    plt.semilogx(alphas_plot, coefficients_matrix[:, i], 'o-', label=feature, linewidth=2)
plt.xlabel('Alpha (Regularization Strength)')
plt.ylabel('Coefficient Value')
plt.title('Regularization Path')
plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

#### Lasso Regression (L1 Regularization)

```python
from sklearn.linear_model import Lasso

# Lasso Regression for feature selection
print("\nLasso Regression for Feature Selection:")
print("-" * 40)

lasso_alphas = [0.01, 0.1, 1.0, 5.0, 10.0]
lasso_results = []

for alpha in lasso_alphas:
    lasso = Lasso(alpha=alpha, max_iter=2000)
    lasso.fit(X_train_student, y_train_student)
    pred = lasso.predict(X_test_student)
    r2 = r2_score(y_test_student, pred)
    n_selected = np.sum(np.abs(lasso.coef_) > 1e-5)
    lasso_results.append((alpha, r2, lasso.coef_, n_selected))
    print(f"Alpha = {alpha:6.2f}: R² = {r2:.4f}, Features selected: {n_selected}")

# Plot Lasso results
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
lasso_alphas_plot = [result[0] for result in lasso_results]
lasso_r2_scores = [result[1] for result in lasso_results]
plt.semilogx(lasso_alphas_plot, lasso_r2_scores, 'ro-', linewidth=2, markersize=8)
plt.xlabel('Alpha (Regularization Strength)')
plt.ylabel('R² Score')
plt.title('Lasso Regression: R² vs Alpha')
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 2)
lasso_coef_matrix = np.array([result[2] for result in lasso_results])
for i, feature in enumerate(feature_names_student):
    plt.semilogx(lasso_alphas_plot, lasso_coef_matrix[:, i], 'o-', label=feature, linewidth=2)
plt.xlabel('Alpha (Regularization Strength)')
plt.ylabel('Coefficient Value')
plt.title('Lasso Regularization Path')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 3)
features_selected = [result[3] for result in lasso_results]
plt.semilogx(lasso_alphas_plot, features_selected, 'go-', linewidth=2, markersize=8)
plt.xlabel('Alpha (Regularization Strength)')
plt.ylabel('Number of Selected Features')
plt.title('Feature Selection by Lasso')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

### Polynomial Regression

```python
from sklearn.preprocessing import PolynomialFeatures

def demonstrate_polynomial_regression():
    """Demonstrate polynomial regression with different degrees"""
    
    # Generate non-linear data
    np.random.seed(42)
    x_poly = np.linspace(0, 4, 100)
    y_true = 2 * x_poly**3 - 5 * x_poly**2 + 3 * x_poly + 1
    y_poly = y_true + np.random.normal(0, 5, 100)
    
    # Fit polynomial models of different degrees
    degrees = [1, 2, 3, 4, 5, 8]
    
    plt.figure(figsize=(15, 10))
    
    for i, degree in enumerate(degrees):
        plt.subplot(2, 3, i+1)
        
        # Create polynomial features
        poly_features = PolynomialFeatures(degree=degree)
        X_poly = poly_features.fit_transform(x_poly.reshape(-1, 1))
        
        # Fit model
        model = LinearRegression()
        model.fit(X_poly, y_poly)
        
        # Predictions for smooth curve
        x_smooth = np.linspace(0, 4, 200)
        X_smooth_poly = poly_features.transform(x_smooth.reshape(-1, 1))
        y_smooth_pred = model.predict(X_smooth_poly)
        
        # Calculate R²
        y_pred = model.predict(X_poly)
        r2 = r2_score(y_poly, y_pred)
        
        # Plot
        plt.scatter(x_poly, y_poly, alpha=0.6, color='blue', s=20)
        plt.plot(x_smooth, y_smooth_pred, color='red', linewidth=2)
        plt.plot(x_poly, y_true, color='green', linewidth=2, alpha=0.7, label='True function')
        plt.xlabel('X')
        plt.ylabel('Y')
        plt.title(f'Degree {degree} (R² = {r2:.3f})')
        plt.grid(True, alpha=0.3)
        plt.legend()
    
    plt.tight_layout()
    plt.show()

demonstrate_polynomial_regression()
```

### Cross-Validation and Model Selection

```python
from sklearn.model_selection import cross_val_score, validation_curve

def comprehensive_model_selection():
    """Demonstrate model selection using cross-validation"""
    
    # Use the student dataset
    X, y = X_student, y_student
    
    # 1. Learning curves
    from sklearn.model_selection import learning_curve
    
    train_sizes, train_scores, val_scores = learning_curve(
        LinearRegression(), X, y, cv=5, 
        train_sizes=np.linspace(0.1, 1.0, 10),
        scoring='r2'
    )
    
    plt.figure(figsize=(15, 10))
    
    # Learning curve
    plt.subplot(2, 3, 1)
    plt.plot(train_sizes, np.mean(train_scores, axis=1), 'o-', label='Training score', linewidth=2)
    plt.plot(train_sizes, np.mean(val_scores, axis=1), 'o-', label='Validation score', linewidth=2)
    plt.fill_between(train_sizes, np.mean(train_scores, axis=1) - np.std(train_scores, axis=1),
                     np.mean(train_scores, axis=1) + np.std(train_scores, axis=1), alpha=0.2)
    plt.fill_between(train_sizes, np.mean(val_scores, axis=1) - np.std(val_scores, axis=1),
                     np.mean(val_scores, axis=1) + np.std(val_scores, axis=1), alpha=0.2)
    plt.xlabel('Training Set Size')
    plt.ylabel('R² Score')
    plt.title('Learning Curve')
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    # 2. Ridge validation curve
    plt.subplot(2, 3, 2)
    alpha_range = np.logspace(-3, 2, 20)
    train_scores_ridge, val_scores_ridge = validation_curve(
        Ridge(), X, y, param_name='alpha', param_range=alpha_range,
        cv=5, scoring='r2'
    )
    
    plt.semilogx(alpha_range, np.mean(train_scores_ridge, axis=1), 'o-', label='Training', linewidth=2)
    plt.semilogx(alpha_range, np.mean(val_scores_ridge, axis=1), 'o-', label='Validation', linewidth=2)
    plt.xlabel('Alpha')
    plt.ylabel('R² Score')
    plt.title('Ridge Validation Curve')
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    # 3. Lasso validation curve
    plt.subplot(2, 3, 3)
    alpha_range_lasso = np.logspace(-3, 1, 20)
    train_scores_lasso, val_scores_lasso = validation_curve(
        Lasso(max_iter=2000), X, y, param_name='alpha', param_range=alpha_range_lasso,
        cv=5, scoring='r2'
    )
    
    plt.semilogx(alpha_range_lasso, np.mean(train_scores_lasso, axis=1), 'o-', label='Training', linewidth=2)
    plt.semilogx(alpha_range_lasso, np.mean(val_scores_lasso, axis=1), 'o-', label='Validation', linewidth=2)
    plt.xlabel('Alpha')
    plt.ylabel('R² Score')
    plt.title('Lasso Validation Curve')
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    # 4. Cross-validation scores comparison
    plt.subplot(2, 3, 4)
    models = {
        'Linear': LinearRegression(),
        'Ridge': Ridge(alpha=1.0),
        'Lasso': Lasso(alpha=0.1, max_iter=2000)
    }
    
    cv_scores = {}
    for name, model in models.items():
        scores = cross_val_score(model, X, y, cv=10, scoring='r2')
        cv_scores[name] = scores
        
    plt.boxplot([cv_scores[name] for name in models.keys()], 
                labels=list(models.keys()))
    plt.ylabel('R² Score')
    plt.title('10-Fold Cross-Validation Comparison')
    plt.grid(True, alpha=0.3)
    
    # Print summary statistics
    print("Cross-Validation Results Summary:")
    print("-" * 40)
    for name, scores in cv_scores.items():
        print(f"{name:10s}: Mean = {np.mean(scores):.4f}, Std = {np.std(scores):.4f}")
    
    plt.tight_layout()
    plt.show()

comprehensive_model_selection()
```

---

## 10. Common Pitfalls and Solutions {#common-pitfalls}

### 1. Multicollinearity Detection and Treatment

```python
from statsmodels.stats.outliers_influence import variance_inflation_factor

def detect_multicollinearity(X, feature_names):
    """Detect multicollinearity using VIF"""
    
    print("Multicollinearity Analysis:")
    print("-" * 30)
    
    # Calculate VIF for each feature
    vif_data = pd.DataFrame()
    vif_data["Feature"] = feature_names
    vif_data["VIF"] = [variance_inflation_factor(X, i) for i in range(X.shape[1])]
    
    print(vif_data)
    print("\nInterpretation:")
    print("VIF = 1: No correlation with other variables")
    print("VIF = 1-5: Moderate correlation")
    print("VIF = 5-10: High correlation")
    print("VIF > 10: Very high correlation (problematic)")
    
    # Correlation matrix
    corr_matrix = np.corrcoef(X.T)
    
    plt.figure(figsize=(10, 8))
    sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0,
                xticklabels=feature_names, yticklabels=feature_names)
    plt.title('Feature Correlation Matrix')
    plt.show()
    
    return vif_data

# Example with artificially correlated features
np.random.seed(42)
n_samples = 200
x1 = np.random.normal(0, 1, n_samples)
x2 = np.random.normal(0, 1, n_samples)
x3 = 0.8 * x1 + 0.2 * np.random.normal(0, 1, n_samples)  # Highly correlated with x1
x4 = np.random.normal(0, 1, n_samples)

X_multicollinear = np.column_stack([x1, x2, x3, x4])
feature_names_multi = ['Feature_1', 'Feature_2', 'Feature_3_corr', 'Feature_4']

vif_results = detect_multicollinearity(X_multicollinear, feature_names_multi)
```

### 2. Outlier Detection and Treatment

```python
def detect_and_handle_outliers(X, y, method='iqr'):
    """Detect and handle outliers"""
    
    plt.figure(figsize=(15, 10))
    
    # Original data
    plt.subplot(2, 3, 1)
    plt.scatter(range(len(y)), y, alpha=0.7)
    plt.xlabel('Index')
    plt.ylabel('Target Value')
    plt.title('Original Data')
    plt.grid(True, alpha=0.3)
    
    # Box plot
    plt.subplot(2, 3, 2)
    plt.boxplot(y)
    plt.ylabel('Target Value')
    plt.title('Box Plot (Original)')
    plt.grid(True, alpha=0.3)
    
    if method == 'iqr':
        # IQR method
        Q1 = np.percentile(y, 25)
        Q3 = np.percentile(y, 75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        
        outlier_mask = (y < lower_bound) | (y > upper_bound)
        
    elif method == 'zscore':
        # Z-score method
        z_scores = np.abs(stats.zscore(y))
        outlier_mask = z_scores > 3
        
    elif method == 'isolation':
        # Isolation Forest
        from sklearn.ensemble import IsolationForest
        isolation_forest = IsolationForest(contamination=0.1, random_state=42)
        outlier_pred = isolation_forest.fit_predict(X)
        outlier_mask = outlier_pred == -1
    
    # Highlight outliers
    plt.subplot(2, 3, 3)
    plt.scatter(range(len(y)), y, c=['red' if outlier else 'blue' for outlier in outlier_mask], alpha=0.7)
    plt.xlabel('Index')
    plt.ylabel('Target Value')
    plt.title(f'Outliers Detected ({method.upper()})')
    plt.grid(True, alpha=0.3)
    
    # Clean data (remove outliers)
    X_clean = X[~outlier_mask]
    y_clean = y[~outlier_mask]
    
    plt.subplot(2, 3, 4)
    plt.scatter(range(len(y_clean)), y_clean, alpha=0.7, color='green')
    plt.xlabel('Index')
    plt.ylabel('Target Value')
    plt.title('Data After Outlier Removal')
    plt.grid(True, alpha=0.3)
    
    # Compare model performance
    model_with_outliers = LinearRegression()
    model_without_outliers = LinearRegression()
    
    # Split data
    X_train_out, X_test_out, y_train_out, y_test_out = train_test_split(X, y, test_size=0.2, random_state=42)
    X_train_clean, X_test_clean, y_train_clean, y_test_clean = train_test_split(X_clean, y_clean, test_size=0.2, random_state=42)
    
    # Fit models
    model_with_outliers.fit(X_train_out, y_train_out)
    model_without_outliers.fit(X_train_clean, y_train_clean)
    
    # Predictions
    pred_with_outliers = model_with_outliers.predict(X_test_out)
    pred_without_outliers = model_without_outliers.predict(X_test_clean)
    
    # Performance
    r2_with = r2_score(y_test_out, pred_with_outliers)
    r2_without = r2_score(y_test_clean, pred_without_outliers)
    
    plt.subplot(2, 3, 5)
    performance_data = ['With Outliers', 'Without Outliers']
    r2_scores = [r2_with, r2_without]
    plt.bar(performance_data, r2_scores, color=['red', 'green'], alpha=0.7)
    plt.ylabel('R² Score')
    plt.title('Model Performance Comparison')
    plt.grid(True, alpha=0.3)
    
    print(f"Outliers detected: {np.sum(outlier_mask)} out of {len(y)} samples")
    print(f"R² with outliers: {r2_with:.4f}")
    print(f"R² without outliers: {r2_without:.4f}")
    print(f"Improvement: {r2_without - r2_with:.4f}")
    
    plt.tight_layout()
    plt.show()
    
    return X_clean, y_clean, outlier_mask

# Demonstrate outlier detection
X_outlier_demo = X_student[:100]  # Use subset for demo
y_outlier_demo = y_student[:100].copy()

# Add some artificial outliers
y_outlier_demo[10] = 150  # Extremely high score
y_outlier_demo[25] = -20  # Negative score
y_outlier_demo[50] = 120  # Very high score

X_clean_demo, y_clean_demo, outliers = detect_and_handle_outliers(X_outlier_demo, y_outlier_demo, method='iqr')
```

### 3. Feature Scaling and Normalization

```python
def demonstrate_feature_scaling():
    """Show the impact of feature scaling on linear regression"""
    
    # Create data with different scales
    np.random.seed(42)
    n_samples = 200
    
    # Features with very different scales
    feature_1 = np.random.normal(1000, 200, n_samples)      # Large scale
    feature_2 = np.random.normal(0.01, 0.005, n_samples)   # Small scale
    feature_3 = np.random.normal(50, 10, n_samples)        # Medium scale
    
    # Target variable
    y_scale = 2*feature_1 + 1000*feature_2 + 3*feature_3 + np.random.normal(0, 100, n_samples)
    
    X_unscaled = np.column_stack([feature_1, feature_2, feature_3])
    
    # Different scaling methods
    scalers = {
        'StandardScaler': StandardScaler(),
        'MinMaxScaler': StandardScaler(),  # Using StandardScaler as proxy
        'RobustScaler': StandardScaler()   # Using StandardScaler as proxy
    }
    
    plt.figure(figsize=(15, 10))
    
    # Original data distribution
    plt.subplot(2, 3, 1)
    plt.boxplot([feature_1, feature_2*1000, feature_3])  # Scale feature_2 for visibility
    plt.xticks([1, 2, 3], ['Feature 1', 'Feature 2 (×1000)', 'Feature 3'])
    plt.ylabel('Value')
    plt.title('Original Feature Distributions')
    plt.grid(True, alpha=0.3)
    
    # Scaled data distribution
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_unscaled)
    
    plt.subplot(2, 3, 2)
    plt.boxplot([X_scaled[:, 0], X_scaled[:, 1], X_scaled[:, 2]])
    plt.xticks([1, 2, 3], ['Feature 1', 'Feature 2', 'Feature 3'])
    plt.ylabel('Standardized Value')
    plt.title('Standardized Feature Distributions')
    plt.grid(True, alpha=0.3)
    
    # Compare gradient descent convergence
    # Unscaled
    gd_unscaled = GradientDescentLinearRegression(learning_rate=1e-8, max_iterations=1000)
    gd_unscaled.fit(X_unscaled, y_scale)
    
    # Scaled
    gd_scaled = GradientDescentLinearRegression(learning_rate=0.01, max_iterations=1000)
    gd_scaled.fit(X_scaled, y_scale)
    
    plt.subplot(2, 3, 3)
    plt.plot(gd_unscaled.cost_history, label='Unscaled', linewidth=2)
    plt.plot(gd_scaled.cost_history, label='Scaled', linewidth=2)
    plt.xlabel('Iteration')
    plt.ylabel('Cost')
    plt.title('Gradient Descent Convergence')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.yscale('log')
    
    # Feature importance comparison
    plt.subplot(2, 3, 4)
    feature_names = ['Feature 1', 'Feature 2', 'Feature 3']
    
    # Fit models for comparison
    model_unscaled = LinearRegression()
    model_scaled = LinearRegression()
    
    model_unscaled.fit(X_unscaled, y_scale)
    model_scaled.fit(X_scaled, y_scale)
    
    x_pos = np.arange(len(feature_names))
    width = 0.35
    
    plt.bar(x_pos - width/2, model_unscaled.coef_, width, label='Unscaled', alpha=0.7)
    plt.bar(x_pos + width/2, model_scaled.coef_, width, label='Scaled', alpha=0.7)
    plt.xlabel('Features')
    plt.ylabel('Coefficient Value')
    plt.title('Coefficient Comparison')
    plt.xticks(x_pos, feature_names)
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    # Model performance comparison
    X_train_uns, X_test_uns, y_train_uns, y_test_uns = train_test_split(X_unscaled, y_scale, test_size=0.2, random_state=42)
    X_train_sc, X_test_sc, y_train_sc, y_test_sc = train_test_split(X_scaled, y_scale, test_size=0.2, random_state=42)
    
    model_unscaled.fit(X_train_uns, y_train_uns)
    model_scaled.fit(X_train_sc, y_train_sc)
    
    pred_unscaled = model_unscaled.predict(X_test_uns)
    pred_scaled = model_scaled.predict(X_test_sc)
    
    r2_unscaled = r2_score(y_test_uns, pred_unscaled)
    r2_scaled = r2_score(y_test_sc, pred_scaled)
    
    plt.subplot(2, 3, 5)
    plt.bar(['Unscaled', 'Scaled'], [r2_unscaled, r2_scaled], color=['red', 'green'], alpha=0.7)
    plt.ylabel('R² Score')
    plt.title('Model Performance')
    plt.grid(True, alpha=0.3)
    
    print("Feature Scaling Impact:")
    print("-" * 25)
    print(f"R² Unscaled: {r2_unscaled:.4f}")
    print(f"R² Scaled: {r2_scaled:.4f}")
    print(f"Gradient Descent Converged (Unscaled): {gd_unscaled.converged}")
    print(f"Gradient Descent Converged (Scaled): {gd_scaled.converged}")
    
    plt.tight_layout()
    plt.show()

demonstrate_feature_scaling()
```

### 4. Handling Categorical Variables

```python
def demonstrate_categorical_encoding():
    """Show different methods for handling categorical variables"""
    
    # Create dataset with categorical variables
    np.random.seed(42)
    n_samples = 300
    
    # Numerical features
    numerical_feature = np.random.normal(50, 15, n_samples)
    
    # Categorical features
    categories_ordinal = np.random.choice(['Low', 'Medium', 'High'], n_samples, p=[0.3, 0.5, 0.2])
    categories_nominal = np.random.choice(['Type_A', 'Type_B', 'Type_C', 'Type_D'], n_samples)
    
    # Create target based on categories
    ordinal_effect = np.where(categories_ordinal == 'Low', 0, 
                             np.where(categories_ordinal == 'Medium', 10, 20))
    nominal_effect = np.where(categories_nominal == 'Type_A', 5,
                             np.where(categories_nominal == 'Type_B', 15,
                                     np.where(categories_nominal == 'Type_C', 10, 0)))
    
    target = numerical_feature + ordinal_effect + nominal_effect + np.random.normal(0, 5, n_samples)
    
    # Create DataFrame
    cat_data = pd.DataFrame({
        'numerical': numerical_feature,
        'ordinal_cat': categories_ordinal,
        'nominal_cat': categories_nominal,
        'target': target
    })
    
    print("Categorical Data Sample:")
    print(cat_data.head(10))
    print(f"\nOrdinal categories: {cat_data['ordinal_cat'].unique()}")
    print(f"Nominal categories: {cat_data['nominal_cat'].unique()}")
    
    # Method 1: Label Encoding for Ordinal
    from sklearn.preprocessing import LabelEncoder
    
    label_encoder = LabelEncoder()
    ordinal_mapping = {'Low': 0, 'Medium': 1, 'High': 2}
    cat_data['ordinal_encoded'] = cat_data['ordinal_cat'].map(ordinal_mapping)
    
    # Method 2: One-Hot Encoding for Nominal
    nominal_dummies = pd.get_dummies(cat_data['nominal_cat'], prefix='nominal')
    
    # Method 3: Target Encoding (mean target value per category)
    target_encoding = cat_data.groupby('nominal_cat')['target'].mean()
    cat_data['nominal_target_encoded'] = cat_data['nominal_cat'].map(target_encoding)
    
    # Combine features for different approaches
    # Approach 1: Label + One-hot
    X_approach1 = pd.concat([
        cat_data[['numerical', 'ordinal_encoded']],
        nominal_dummies
    ], axis=1)
    
    # Approach 2: Label + Target encoding
    X_approach2 = cat_data[['numerical', 'ordinal_encoded', 'nominal_target_encoded']]
    
    y_cat = cat_data['target']
    
    # Compare approaches
    approaches = {
        'Label + One-Hot': X_approach1,
        'Label + Target Encoding': X_approach2
    }
    
    plt.figure(figsize=(15, 10))
    
    results = {}
    for i, (name, X) in enumerate(approaches.items()):
        # Split and train
        X_train, X_test, y_train, y_test = train_test_split(X, y_cat, test_size=0.2, random_state=42)
        
        model = LinearRegression()
        model.fit(X_train, y_train)
        pred = model.predict(X_test)
        r2 = r2_score(y_test, pred)
        
        results[name] = {
            'r2': r2,
            'features': X.columns.tolist(),
            'n_features': X.shape[1],
            'coefficients': model.coef_
        }
        
        # Plot predictions vs actual
        plt.subplot(2, 3, i+1)
        plt.scatter(y_test, pred, alpha=0.7)
        plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
        plt.xlabel('Actual')
        plt.ylabel('Predicted')
        plt.title(f'{name}\n(R² = {r2:.4f}, Features = {X.shape[1]})')
        plt.grid(True, alpha=0.3)
    
    # Feature importance comparison
    plt.subplot(2, 3, 3)
    for name, result in results.items():
        feature_importance = np.abs(result['coefficients'])
        top_features = np.argsort(feature_importance)[-5:]  # Top 5 features
        
        plt.barh(range(len(top_features)), feature_importance[top_features], 
                alpha=0.7, label=name)
    
    plt.xlabel('Absolute Coefficient Value')
    plt.ylabel('Feature Index')
    plt.title('Top 5 Feature Importance')
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    # Category effect visualization
    plt.subplot(2, 3, 4)
    ordinal_means = cat_data.groupby('ordinal_cat')['target'].mean()
    plt.bar(ordinal_means.index, ordinal_means.values, alpha=0.7, color='blue')
    plt.xlabel('Ordinal Category')
    plt.ylabel('Mean Target Value')
    plt.title('Ordinal Category Effect')
    plt.grid(True, alpha=0.3)
    
    plt.subplot(2, 3, 5)
    nominal_means = cat_data.groupby('nominal_cat')['target'].mean()
    plt.bar(nominal_means.index, nominal_means.values, alpha=0.7, color='green')
    plt.xlabel('Nominal Category')
    plt.ylabel('Mean Target Value')
    plt.title('Nominal Category Effect')
    plt.xticks(rotation=45)
    plt.grid(True, alpha=0.3)
    
    # Performance comparison
    plt.subplot(2, 3, 6)
    method_names = list(results.keys())
    r2_scores = [results[name]['r2'] for name in method_names]
    n_features = [results[name]['n_features'] for name in method_names]
    
    x_pos = np.arange(len(method_names))
    plt.bar(x_pos, r2_scores, alpha=0.7, color=['blue', 'orange'])
    plt.xlabel('Encoding Method')
    plt.ylabel('R² Score')
    plt.title('Method Comparison')
    plt.xticks(x_pos, method_names, rotation=45)
    
    # Add feature count as text
    for i, (r2, n_feat) in enumerate(zip(r2_scores, n_features)):
        plt.text(i, r2 + 0.01, f'{n_feat} features', ha='center', va='bottom')
    
    plt.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()
    
    print("\nCategorical Encoding Results:")
    print("-" * 35)
    for name, result in results.items():
        print(f"{name}:")
        print(f"  R² Score: {result['r2']:.4f}")
        print(f"  Number of features: {result['n_features']}")
        print(f"  Features: {result['features'][:5]}...")  # Show first 5 features
        print()

demonstrate_categorical_encoding()
```

---

## Summary and Best Practices

### Key Takeaways

1. **Model Selection**: Choose between simple and multiple regression based on your problem complexity and available data.

2. **Assumption Checking**: Always validate linear regression assumptions before interpreting results.

3. **Feature Engineering**: Proper handling of categorical variables and feature scaling can significantly improve model performance.

4. **Regularization**: Use Ridge or Lasso regression when dealing with multicollinearity or when feature selection is needed.

5. **Cross-Validation**: Always use cross-validation to get reliable estimates of model performance.

6. **Outlier Detection**: Identify and appropriately handle outliers to improve model robustness.

### Best Practices Checklist

- [ ] **Data Exploration**: Understand your data through descriptive statistics and visualizations
- [ ] **Assumption Validation**: Check linearity, independence, homoscedasticity, and normality
- [ ] **Feature Engineering**: Handle categorical variables, scale features, and create meaningful interactions
- [ ] **Model Selection**: Compare different approaches using cross-validation
- [ ] **Diagnostics**: Examine residuals and check for influential observations
- [ ] **Interpretation**: Understand what coefficients mean in the context of your problem
- [ ] **Validation**: Test model performance on unseen data

### When to Use Linear Regression

**Good for**:
- Interpretable models where you need to understand feature relationships
- Baseline models before trying more complex approaches
- Problems with linear relationships between features and target
- Small to medium-sized datasets

**Consider alternatives when**:
- Relationships are clearly non-linear
- You have very high-dimensional data
- You need more flexible models
- Interpretability is not a priority

### Further Reading and Extensions

- **Generalized Linear Models (GLM)**: Extend linear regression to non-normal distributions
- **Mixed Effects Models**: Handle hierarchical or grouped data
- **Time Series Regression**: Deal with temporal dependencies
- **Bayesian Linear Regression**: Incorporate prior beliefs and uncertainty quantification
- **Robust Regression**: Handle outliers and model misspecification

This comprehensive guide provides both theoretical understanding and practical implementation skills for linear regression. The combination of mathematical foundations, detailed examples, and real-world applications should give you a solid foundation for applying linear regression to your own problems.