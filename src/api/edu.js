import http from "@/utils/request";

/**
 * 课程管理列表
 */
export const eduCoursePage = data => {
    return http({
        url: `/edu/course/page`,
        method: 'post',
        data: data
    })
}

/**
 * 创建课程
 */
export const eduCourseSave = data => {
    return http({
        url: `/edu/course/save`,
        method: 'post',
        data: data
    })
}

/**
 * 课程状态更新
 */
export const eduCourseUpdateStatus = data => {
    return http({
        url: `/edu/course/update/status`,
        method: 'put',
        data: data
    })
}


/**
 * 课程分类列表
 */
export const eduCatalogTree = data => {
    return http({
        url: `/edu/catalog/tree`,
        method: 'get',
        data: data
    })
}

/**
 * 课程分类列表
 */
export const eduCatalogSave = data => {
    return http({
        url: `/edu/catalog/save`,
        method: 'post',
        data: data
    })
}

/**
 * 删除课程分类
 */
export const eduCatalogDelete = id => {
    return http({
        url: `/edu/catalog/delete?catalogId=${id}`,
        method: 'delete',
    })
}