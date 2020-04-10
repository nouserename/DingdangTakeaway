//���� ��װ�õ� ���󹤾�
import fetch from '../config/fetch'
/**
 * ��ȡ��ҳĬ�ϵ�ַ
 */
export const cityGuess = () => fetch('/v1/cities', {
    type: 'guess'
});
/**
 * ��ȡ��ҳ���ų���
 */
export const hotcity = () => fetch('/v1/cities', {
    type: 'hot'
});
/**
 * ��ȡ��ҳ���г���
 */
export const groupcity = () => fetch('/v1/cities', {
    type: 'group'
});
/**
 * ��ȡ��ǰ���ڳ���
 */
export const currentcity = number => fetch('/v1/cities/' + number);
/**
 * ��ȡ������ַ
 */
export const searchplace = (cityid, value) => fetch('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
});