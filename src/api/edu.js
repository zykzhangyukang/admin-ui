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