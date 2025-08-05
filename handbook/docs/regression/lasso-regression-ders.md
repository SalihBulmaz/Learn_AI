# Lasso Regression: L1 Regularization for Sparse Linear Modeling

## Table of Contents
1. [Introduction and Motivation](#introduction)
2. [Mathematical Foundation](#mathematical-foundation)
3. [Understanding L1 Regularization](#understanding-regularization)
4. [Lasso vs Ridge vs Linear Regression](#lasso-vs-others)
5. [Hyperparameter Tuning](#hyperparameter-tuning)
6. [Feature Selection with Lasso](#feature-selection)
7. [Python Implementation from Scratch](#python-implementation)
8. [Advanced Lasso Techniques](#advanced-techniques)
9. [Two Comprehensive Case Studies](#case-studies)
10. [Sparsity and Interpretability](#sparsity-interpretability)
11. [Model Validation and Diagnostics](#validation-diagnostics)
12. [Comparative Analysis with Other Methods](#comparative-analysis)

---

## 1. Introduction and Motivation {#introduction}

Lasso (Least Absolute Shrinkage and Selection Operator) regression introduces L1 regularization to linear regression, performing both regularization and automatic feature selection. By adding an L1 penalty term, Lasso can shrink some coefficients to exactly zero, effectively removing irrelevant features from the model.

### Why Lasso Regression?

Lasso addresses several key challenges in linear modeling:
- **Feature Selection**: Automatically identifies and removes irrelevant features
- **Sparsity**: Creates sparse models with fewer non-zero coefficients
- **Interpretability**: Easier to interpret models with fewer features
- **Overfitting Prevention**: Reduces model complexity through regularization
- **High-dimensional Data**: Effective when p > n (more features than samples)

### Key Advantages
- **Automatic Feature Selection**: Sets irrelevant coefficients to exactly zero
- **Sparsity**: Creates interpretable, sparse models
- **High-dimensional Handling**: Works well with many features
- **Computational Efficiency**: Fast optimization algorithms available
- **Variable Selection**: Built-in feature importance ranking

### Limitations to Consider
- **Feature Correlation**: Can randomly select one feature from correlated groups
- **No Closed-form Solution**: Requires iterative optimization
- **Hyperparameter Sensitivity**: Alpha selection is critical
- **Unstable Selection**: Small data changes can affect feature selection

---

## 2. Mathematical Foundation {#mathematical-foundation}

### Lasso Regression Objective Function

Lasso modifies the OLS objective by adding an L1 penalty term:

```
minimize: ||y - Xβ||² + α||β||₁
```

Where:
- `y` = target variable vector (n × 1)
- `X` = feature matrix (n × p)
- `β` = coefficient vector (p × 1)
- `α` = regularization parameter (α ≥ 0)
- `||β||₁` = L1 norm of coefficients (sum of absolute values)

### Geometric Interpretation

The L1 penalty creates a diamond-shaped constraint region:
1. **Corner Solutions**: Coefficients are set to zero at corners
2. **Sparsity**: Encourages sparse solutions
3. **Feature Selection**: Automatic elimination of irrelevant features

### Optimization Properties

- **No closed-form solution**: Requires iterative methods
- **Non-differentiable**: At points where coefficients are zero
- **Coordinate descent**: Efficient optimization algorithm
- **Path algorithms**: Can compute solutions for all α values

---

## 3. Understanding L1 Regularization {#understanding-regularization}

### The Sparsity Effect

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import Lasso, Ridge, LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')

# Set style and random seed
plt.style.use('seaborn-v0_8')
np.random.seed(42)

def demonstrate_sparsity_effect():
    """Demonstrate how Lasso creates sparse solutions"""
    
    # Generate synthetic data with sparse true coefficients
    n_samples = 100
    n_features = 20
    
    # Create features
    X = np.random.normal(0, 1, (n_samples, n_features))
    
    # True coefficients (only first 5 are non-zero)
    true_coefficients = np.zeros(n_features)
    true_coefficients[:5] = [2.0, -1.5, 1.0, -0.8, 0.5]
    
    # Generate target
    y = X @ true_coefficients + np.random.normal(0, 0.5, n_samples)
    
    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Test different alpha values
    alphas = [0, 0.01, 0.1, 1, 10, 100]
    
    fig, axes = plt.subplots(2, 3, figsize=(18, 12))
    axes = axes.ravel()
    
    for i, alpha in enumerate(alphas):
        # Fit model
        if alpha == 0:
            model = LinearRegression()
        else:
            model = Lasso(alpha=alpha, max_iter=2000)
        
        model.fit(X_scaled, y)
        
        # Get coefficients
        coefs = model.coef_
        
        # Plot coefficients
        axes[i].bar(range(n_features), coefs, alpha=0.7, color='lightcoral')
        axes[i].axhline(y=0, color='black', linestyle='-', alpha=0.3)
        axes[i].set_title(f'α = {alpha}\nNon-zero: {np.sum(coefs != 0)}/{n_features}')
        axes[i].set_xlabel('Feature Index')
        axes[i].set_ylabel('Coefficient Value')
        axes[i].grid(True, alpha=0.3)
        
        # Add true coefficients for comparison
        if alpha == 0:
            axes[i].plot(range(n_features), true_coefficients, 'ro', 
                        markersize=8, label='True Coefficients')
            axes[i].legend()
    
    plt.tight_layout()
    plt.show()
    
    # Sparsity analysis
    print("Sparsity Analysis:")
    print("=" * 60)
    print(f"{'Alpha':<8} {'Non-zero':<10} {'L1 Norm':<12} {'R²':<8}")
    print("-" * 60)
    
    for alpha in alphas:
        if alpha == 0:
            model = LinearRegression()
        else:
            model = Lasso(alpha=alpha, max_iter=2000)
        
        model.fit(X_scaled, y)
        coefs = model.coef_
        
        non_zero = np.sum(coefs != 0)
        l1_norm = np.sum(np.abs(coefs))
        y_pred = model.predict(X_scaled)
        r2 = r2_score(y, y_pred)
        
        print(f"{alpha:<8} {non_zero:<10} {l1_norm:<12.4f} {r2:<8.4f}")

demonstrate_sparsity_effect()
```

### Comparison with Ridge Regression

```python
def compare_lasso_ridge():
    """Compare Lasso and Ridge regularization effects"""
    
    np.random.seed(42)
    n_samples = 100
    n_features = 15
    
    # Create features with some correlation
    X = np.random.normal(0, 1, (n_samples, n_features))
    
    # True coefficients (sparse)
    true_coefficients = np.zeros(n_features)
    true_coefficients[:5] = [2.0, -1.5, 1.0, -0.8, 0.5]
    
    # Generate target
    y = X @ true_coefficients + np.random.normal(0, 0.5, n_samples)
    
    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Test different alpha values
    alphas = [0.01, 0.1, 1, 10, 100]
    
    fig, axes = plt.subplots(2, 3, figsize=(18, 12))
    
    # Coefficient paths for Lasso
    axes[0, 0].set_title('Lasso Coefficient Paths')
    alphas_log = np.logspace(-3, 2, 50)
    coef_paths_lasso = []
    
    for alpha in alphas_log:
        lasso = Lasso(alpha=alpha, max_iter=2000)
        lasso.fit(X_scaled, y)
        coef_paths_lasso.append(lasso.coef_)
    
    coef_paths_lasso = np.array(coef_paths_lasso)
    
    for i in range(n_features):
        axes[0, 0].plot(alphas_log, coef_paths_lasso[:, i], linewidth=2)
    
    axes[0, 0].set_xscale('log')
    axes[0, 0].set_xlabel('Alpha')
    axes[0, 0].set_ylabel('Coefficient Value')
    axes[0, 0].grid(True, alpha=0.3)
    
    # Coefficient paths for Ridge
    axes[0, 1].set_title('Ridge Coefficient Paths')
    coef_paths_ridge = []
    
    for alpha in alphas_log:
        ridge = Ridge(alpha=alpha)
        ridge.fit(X_scaled, y)
        coef_paths_ridge.append(ridge.coef_)
    
    coef_paths_ridge = np.array(coef_paths_ridge)
    
    for i in range(n_features):
        axes[0, 1].plot(alphas_log, coef_paths_ridge[:, i], linewidth=2)
    
    axes[0, 1].set_xscale('log')
    axes[0, 1].set_xlabel('Alpha')
    axes[0, 1].set_ylabel('Coefficient Value')
    axes[0, 1].grid(True, alpha=0.3)
    
    # Sparsity comparison
    axes[0, 2].set_title('Sparsity Comparison')
    sparsity_lasso = []
    sparsity_ridge = []
    
    for alpha in alphas_log:
        lasso = Lasso(alpha=alpha, max_iter=2000)
        ridge = Ridge(alpha=alpha)
        
        lasso.fit(X_scaled, y)
        ridge.fit(X_scaled, y)
        
        sparsity_lasso.append(np.sum(lasso.coef_ != 0))
        sparsity_ridge.append(np.sum(ridge.coef_ != 0))
    
    axes[0, 2].plot(alphas_log, sparsity_lasso, 'r-', label='Lasso', linewidth=2)
    axes[0, 2].plot(alphas_log, sparsity_ridge, 'b-', label='Ridge', linewidth=2)
    axes[0, 2].set_xscale('log')
    axes[0, 2].set_xlabel('Alpha')
    axes[0, 2].set_ylabel('Number of Non-zero Coefficients')
    axes[0, 2].legend()
    axes[0, 2].grid(True, alpha=0.3)
    
    # Performance comparison
    axes[1, 0].set_title('MSE Comparison')
    mse_lasso = []
    mse_ridge = []
    
    for alpha in alphas_log:
        lasso = Lasso(alpha=alpha, max_iter=2000)
        ridge = Ridge(alpha=alpha)
        
        lasso.fit(X_scaled, y)
        ridge.fit(X_scaled, y)
        
        y_lasso_pred = lasso.predict(X_scaled)
        y_ridge_pred = ridge.predict(X_scaled)
        
        mse_lasso.append(mean_squared_error(y, y_lasso_pred))
        mse_ridge.append(mean_squared_error(y, y_ridge_pred))
    
    axes[1, 0].plot(alphas_log, mse_lasso, 'r-', label='Lasso', linewidth=2)
    axes[1, 0].plot(alphas_log, mse_ridge, 'b-', label='Ridge', linewidth=2)
    axes[1, 0].set_xscale('log')
    axes[1, 0].set_xlabel('Alpha')
    axes[1, 0].set_ylabel('Mean Squared Error')
    axes[1, 0].legend()
    axes[1, 0].grid(True, alpha=0.3)
    
    # Feature selection accuracy
    axes[1, 1].set_title('Feature Selection Accuracy')
    selection_accuracy = []
    
    for alpha in alphas_log:
        lasso = Lasso(alpha=alpha, max_iter=2000)
        lasso.fit(X_scaled, y)
        
        # Check if selected features match true non-zero features
        selected = lasso.coef_ != 0
        true_selected = true_coefficients != 0
        
        accuracy = np.sum(selected == true_selected) / len(selected)
        selection_accuracy.append(accuracy)
    
    axes[1, 1].plot(alphas_log, selection_accuracy, 'g-', linewidth=2)
    axes[1, 1].set_xscale('log')
    axes[1, 1].set_xlabel('Alpha')
    axes[1, 1].set_ylabel('Selection Accuracy')
    axes[1, 1].grid(True, alpha=0.3)
    
    # Coefficient magnitude comparison
    axes[1, 2].set_title('Coefficient Magnitude Comparison')
    alpha_test = 1.0
    
    lasso = Lasso(alpha=alpha_test, max_iter=2000)
    ridge = Ridge(alpha=alpha_test)
    
    lasso.fit(X_scaled, y)
    ridge.fit(X_scaled, y)
    
    x_pos = np.arange(n_features)
    width = 0.35
    
    axes[1, 2].bar(x_pos - width/2, lasso.coef_, width, label='Lasso', alpha=0.7)
    axes[1, 2].bar(x_pos + width/2, ridge.coef_, width, label='Ridge', alpha=0.7)
    axes[1, 2].set_xlabel('Feature Index')
    axes[1, 2].set_ylabel('Coefficient Value')
    axes[1, 2].legend()
    axes[1, 2].grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()

compare_lasso_ridge()
```

---

## 4. Lasso vs Ridge vs Linear Regression {#lasso-vs-others}

### When to Use Each Method

**Use Linear Regression when:**
- Data is well-conditioned
- No multicollinearity
- Sufficient samples relative to features
- No overfitting concerns

**Use Ridge Regression when:**
- Multicollinearity is present
- All features are potentially important
- You want stable coefficient estimates
- High-dimensional data (p > n)

**Use Lasso Regression when:**
- Feature selection is important
- You expect sparse solutions
- Interpretability is crucial
- High-dimensional data with many irrelevant features

### Practical Comparison

```python
def practical_comparison():
    """Practical comparison of all three methods"""
    
    np.random.seed(42)
    
    # Scenario 1: Sparse true coefficients
    print("Scenario 1: Sparse True Coefficients")
    print("=" * 50)
    
    n_samples = 100
    n_features = 20
    
    X = np.random.normal(0, 1, (n_samples, n_features))
    
    # Only first 5 features are important
    true_coefficients = np.zeros(n_features)
    true_coefficients[:5] = [2.0, -1.5, 1.0, -0.8, 0.5]
    
    y = X @ true_coefficients + np.random.normal(0, 0.5, n_samples)
    
    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.3, random_state=42
    )
    
    # Fit models
    linear = LinearRegression()
    ridge = Ridge(alpha=1.0)
    lasso = Lasso(alpha=0.1, max_iter=2000)
    
    linear.fit(X_train, y_train)
    ridge.fit(X_train, y_train)
    lasso.fit(X_train, y_train)
    
    # Compare performance
    models = [linear, ridge, lasso]
    names = ['Linear', 'Ridge', 'Lasso']
    
    print("Performance Comparison:")
    print(f"{'Model':<10} {'Train MSE':<12} {'Test MSE':<12} {'Non-zero':<10} {'R²':<8}")
    print("-" * 60)
    
    for model, name in zip(models, names):
        y_train_pred = model.predict(X_train)
        y_test_pred = model.predict(X_test)
        
        train_mse = mean_squared_error(y_train, y_train_pred)
        test_mse = mean_squared_error(y_test, y_test_pred)
        non_zero = np.sum(model.coef_ != 0)
        r2 = r2_score(y_test, y_test_pred)
        
        print(f"{name:<10} {train_mse:<12.4f} {test_mse:<12.4f} {non_zero:<10} {r2:<8.4f}")
    
    # Feature selection analysis
    print(f"\nFeature Selection Analysis:")
    print(f"{'Feature':<8} {'True':<8} {'Linear':<8} {'Ridge':<8} {'Lasso':<8}")
    print("-" * 50)
    
    for i in range(n_features):
        true_val = true_coefficients[i]
        linear_val = linear.coef_[i]
        ridge_val = ridge.coef_[i]
        lasso_val = lasso.coef_[i]
        
        print(f"{i+1:<8} {true_val:<8.3f} {linear_val:<8.3f} {ridge_val:<8.3f} {lasso_val:<8.3f}")

practical_comparison()
```

---

## 5. Hyperparameter Tuning {#hyperparameter-tuning}

### Selecting the Optimal Alpha

```python
def lasso_hyperparameter_tuning():
    """Demonstrate hyperparameter tuning for Lasso"""
    
    from sklearn.model_selection import GridSearchCV, validation_curve
    from sklearn.pipeline import Pipeline
    
    np.random.seed(42)
    
    # Generate data
    n_samples = 200
    n_features = 30
    
    X = np.random.normal(0, 1, (n_samples, n_features))
    
    # Sparse true coefficients
    true_coefficients = np.zeros(n_features)
    true_coefficients[:8] = [2.0, -1.5, 1.0, -0.8, 0.5, 1.2, -0.9, 0.7]
    
    y = X @ true_coefficients + np.random.normal(0, 0.5, n_samples)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=42
    )
    
    # Grid search
    param_grid = {
        'lasso__alpha': [0.001, 0.01, 0.1, 1, 10, 100]
    }
    
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('lasso', Lasso(max_iter=2000))
    ])
    
    grid_search = GridSearchCV(
        pipeline, param_grid, cv=5, scoring='neg_mean_squared_error'
    )
    
    grid_search.fit(X_train, y_train)
    
    print(f"Best alpha: {grid_search.best_params_['lasso__alpha']}")
    print(f"Best CV score: {-grid_search.best_score_:.4f}")
    
    # Validation curve
    alphas = np.logspace(-3, 2, 20)
    
    train_scores, val_scores = validation_curve(
        pipeline, X_train, y_train, param_name='lasso__alpha',
        param_range=alphas, cv=5, scoring='neg_mean_squared_error'
    )
    
    train_scores = -train_scores
    val_scores = -val_scores
    
    plt.figure(figsize=(12, 8))
    
    plt.subplot(2, 2, 1)
    plt.plot(alphas, train_scores.mean(axis=1), 'bo-', label='Train MSE')
    plt.plot(alphas, val_scores.mean(axis=1), 'ro-', label='Validation MSE')
    plt.xscale('log')
    plt.xlabel('Alpha')
    plt.ylabel('Mean Squared Error')
    plt.title('Validation Curve')
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    # Coefficient paths
    plt.subplot(2, 2, 2)
    coef_paths = []
    
    for alpha in alphas:
        lasso = Lasso(alpha=alpha, max_iter=2000)
        lasso.fit(StandardScaler().fit_transform(X_train), y_train)
        coef_paths.append(lasso.coef_)
    
    coef_paths = np.array(coef_paths)
    
    for i in range(min(10, n_features)):
        plt.plot(alphas, coef_paths[:, i], linewidth=2)
    
    plt.xscale('log')
    plt.xlabel('Alpha')
    plt.ylabel('Coefficient Value')
    plt.title('Lasso Coefficient Paths')
    plt.grid(True, alpha=0.3)
    
    # Sparsity vs alpha
    plt.subplot(2, 2, 3)
    sparsity = [np.sum(coef_paths[i] != 0) for i in range(len(alphas))]
    plt.plot(alphas, sparsity, 'g-', linewidth=2)
    plt.xscale('log')
    plt.xlabel('Alpha')
    plt.ylabel('Number of Non-zero Coefficients')
    plt.title('Sparsity vs Alpha')
    plt.grid(True, alpha=0.3)
    
    # Final model performance
    plt.subplot(2, 2, 4)
    
    best_alpha = grid_search.best_params_['lasso__alpha']
    best_pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('lasso', Lasso(alpha=best_alpha, max_iter=2000))
    ])
    
    best_pipeline.fit(X_train, y_train)
    y_train_pred = best_pipeline.predict(X_train)
    y_test_pred = best_pipeline.predict(X_test)
    
    plt.scatter(y_train, y_train_pred, alpha=0.6, label='Train')
    plt.scatter(y_test, y_test_pred, alpha=0.6, label='Test')
    plt.plot([y.min(), y.max()], [y.min(), y.max()], 'k--', lw=2)
    plt.xlabel('Actual Values')
    plt.ylabel('Predicted Values')
    plt.title('Predictions vs Actual')
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()
    
    # Final results
    print(f"\nFinal Model Performance:")
    print(f"Best Alpha: {best_alpha}")
    print(f"Non-zero coefficients: {np.sum(best_pipeline.named_steps['lasso'].coef_ != 0)}")
    print(f"Train MSE: {mean_squared_error(y_train, y_train_pred):.4f}")
    print(f"Test MSE: {mean_squared_error(y_test, y_test_pred):.4f}")
    print(f"Train R²: {r2_score(y_train, y_train_pred):.4f}")
    print(f"Test R²: {r2_score(y_test, y_test_pred):.4f}")

lasso_hyperparameter_tuning()
```

---

## Summary and Best Practices

### Key Takeaways

**Lasso Regression Strengths:**
- Automatic feature selection through sparsity
- Handles high-dimensional data effectively
- Creates interpretable, sparse models
- Built-in feature importance ranking
- Effective regularization for overfitting

**Common Challenges:**
- **Feature correlation**: Can randomly select from correlated groups
- **Unstable selection**: Small data changes affect feature selection
- **Hyperparameter sensitivity**: Alpha selection is critical
- **No closed-form solution**: Requires iterative optimization

**Best Practices:**

1. **Data Preprocessing**
   - Always scale features before Lasso
   - Handle multicollinearity appropriately
   - Remove highly correlated features if interpretability is important

2. **Hyperparameter Tuning**
   - Use cross-validation for alpha selection
   - Consider stability selection for robust feature selection
   - Monitor both performance and sparsity

3. **Model Evaluation**
   - Use multiple metrics (MSE, R², feature selection accuracy)
   - Validate feature selection stability
   - Check for overfitting using validation curves

4. **Feature Engineering**
   - Create meaningful interaction terms
   - Consider domain knowledge for feature creation
   - Use regularization path analysis

5. **Alternative Approaches**
   - Use Ridge for stable coefficient estimates
   - Consider Elastic Net for balanced regularization
   - Try stability selection for robust feature selection

**Decision Framework:**

- **Use Linear Regression** when data is well-conditioned and no overfitting
- **Use Ridge Regression** when multicollinearity is present
- **Use Lasso Regression** when feature selection is important
- **Use Elastic Net** when you want both L1 and L2 benefits
- **Use Other Methods** for complex non-linear relationships

This comprehensive guide provides both theoretical understanding and practical implementation skills for Lasso regression, enabling you to apply these techniques effectively to real-world problems while avoiding common pitfalls. 