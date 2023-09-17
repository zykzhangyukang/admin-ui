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