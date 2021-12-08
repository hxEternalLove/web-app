/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    function sortarr(n1,n2) {
        return n1-n2;
    }
    let arr = nums1.concat(nums2).sort(sortarr);
    let index = Math.floor(arr.length/2)
    if (arr.length%2==0) {
        return (arr[index-1]+arr[index])/2
    }
    return arr[index]
};
// @lc code=end

