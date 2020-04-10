
/**
 * ���ñ��뻷�������ϻ���֮����л�
 * 
 * baseUrl: ������ַ
 * routerMode: ·��ģʽ
 * imgBaseUrl: ͼƬ����������ַ
 * 
 */
let baseUrl = ''; 
let routerMode = 'hash';
let imgBaseUrl = '';


if (process.env.NODE_ENV == 'development') { //����ǿ������� ͼƬ·������ img �ļ���
    imgBaseUrl = '/img/';

}else if(process.env.NODE_ENV == 'production'){//����������ͼƬ��Դ·�������·������
    baseUrl = '//localhost:8888'
    imgBaseUrl = '//localhost:8888/img/';
}

export { //���� url
    baseUrl,
    routerMode,
    imgBaseUrl,
}