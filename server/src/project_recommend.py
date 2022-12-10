# projcet recommend by Matrix Factoriztion with Neighborhood method
# if there is enough amout of data, we will update to use Latent factor models

from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds

import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
import warnings
import sys
warnings.filterwarnings("ignore")

member_data = pd.read_csv('src/datas/member.csv')
project_data = pd.read_csv('src/datas/project.csv')

member_data.drop('leader', axis = 1, inplace = True)

member_project_data = pd.merge(member_data, project_data, on = 'projectId')

member_project_rate = member_project_data.pivot_table('rate', index = 'userId', columns='projectName').fillna(0)

# matrix는 pivot_table 값을 numpy matrix로 만든 것
matrix = member_project_rate.to_numpy()

# member_rate_mean은 사용자의 평균 평점
member_rate_mean = np.mean(matrix, axis = 1)

# matrix_user_mean: 사용자-프로젝트에 대해 사용자 평균 평점을 뺀 것
matrix_member_mean = matrix - member_rate_mean.reshape(-1, 1)

# print(matrix)

# print(pd.DataFrame(matrix_user_mean, columns = member_project_rate.columns).head())

# scipy에서 제공해주는 svd
# U 행렬, sigma 행렬, V 전치 행렬을 반환
# print(matrix_user_mean.shape)

U, sigma, Vt = svds(matrix_member_mean, k = 9)

'''
print(U.shape)
print(sigma.shape)
print(Vt.shape)
'''

sigma = np.diag(sigma)
'''
print(sigma.shape)
print(sigma[0])
print(sigma[1])
'''

# U, Sigma, Vt의 내적을 수행하면, 다시 원본 행렬로 복원이 된다.
# 거기에 + 사용자 평균 rate를 적용한다.
svd_member_predicted_rate = np.dot(np.dot(U, sigma), Vt) + member_rate_mean.reshape(-1,1)
svd_preds = pd.DataFrame(svd_member_predicted_rate, columns = member_project_rate.columns)
# print(svd_preds.head())

def recommend_projects(df_svd_preds, user_id, ori_project_df, ori_ratings_df, num_recommendations=5):
    
    #현재는 index로 적용이 되어있으므로 user_id - 1을 해야함.
    user_row_number = user_id - 1 
    
    # 최종적으로 만든 pred_df에서 사용자 index에 따라 프로젝트 데이터 정렬 -> 영화 평점이 높은 순으로 정렬 됌
    sorted_user_predictions = df_svd_preds.iloc[user_row_number].sort_values(ascending=False)
    # print(sorted_user_predictions.head())
    
    # 원본 평점 데이터에서 user id에 해당하는 데이터를 뽑아낸다. 
    user_data = ori_ratings_df[ori_ratings_df.userId == user_id]
    # print(user_data.head())
    
    # 위에서 뽑은 user_data와 원본 프로젝트 데이터를 합친다. 
    user_history = user_data.merge(ori_project_df, on = 'projectId').sort_values(['rate'], ascending=False)
    # print(user_history.shape)
    # print(user_history.head())
    
    # 원본 프로젝트 데이터에서 사용자가 본 프로젝트 데이터를 제외한 데이터를 추출
    recommendations = ori_project_df[~ori_project_df['projectName'].isin(user_history['projectName'])]
    # print(recommendations.head())
    # 사용자의 프로젝트 평점이 높은 순으로 정렬된 데이터와 위 recommendations을 합친다. 
    recommendations = recommendations.merge( pd.DataFrame(sorted_user_predictions).reset_index(), on = 'projectName')
    # 컬럼 이름 바꾸고 정렬해서 return
    recommendations = recommendations.rename(columns = {user_row_number: 'Predictions'}).sort_values('Predictions', ascending = False).iloc[:num_recommendations, :]
                      

    return recommendations

# already_rated, predictions = recommend_projects(svd_preds, 4, project_data, member_data, 1)

# print(already_rated.head(10))

# print(predictions)

if __name__ == '__main__':
    r_list = recommend_projects(svd_preds, int(sys.argv[1]), project_data, member_data, int(sys.argv[2]))
    print(r_list)