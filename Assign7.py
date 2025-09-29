import numpy as np
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Generate synthetic dataset with 5 centers
X, y_true = make_blobs(n_samples=300, centers=5, cluster_std=0.60, random_state=0)

# K-means clustering with arbitrary k=4
k_arbitrary = 4
kmeans_arbitrary = KMeans(n_clusters=k_arbitrary, random_state=42)
clusters_arbitrary = kmeans_arbitrary.fit_predict(X)

# Elbow method to find optimal k
sse = []
k_range = range(1, 11)
for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X)
    sse.append(kmeans.inertia_)

# Plot elbow curve
plt.figure(figsize=(8, 5))
plt.plot(k_range, sse, 'bx-')
plt.xlabel('Number of clusters (k)')
plt.ylabel('Sum of Squared Errors (SSE)')
plt.title('Elbow Method For Optimal k')
plt.show()

# Optimal k identified from elbow plot (visually 5 here)
k_optimal = 5
kmeans_optimal = KMeans(n_clusters=k_optimal, random_state=42)
clusters_optimal = kmeans_optimal.fit_predict(X)

# Compare clustering results
plt.figure(figsize=(14, 6))

plt.subplot(1, 2, 1)
plt.scatter(X[:, 0], X[:, 1], c=clusters_arbitrary, cmap='viridis')
plt.scatter(kmeans_arbitrary.cluster_centers_[:, 0], kmeans_arbitrary.cluster_centers_[:, 1], 
            c='red', s=100, marker='X')
plt.title(f'K-means with arbitrary k={k_arbitrary}')

plt.subplot(1, 2, 2)
plt.scatter(X[:, 0], X[:, 1], c=clusters_optimal, cmap='viridis')
plt.scatter(kmeans_optimal.cluster_centers_[:, 0], kmeans_optimal.cluster_centers_[:, 1], 
            c='red', s=100, marker='X')
plt.title(f'K-means with optimal k={k_optimal}')

plt.show()
