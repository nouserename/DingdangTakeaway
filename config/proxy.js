const context = [ //����·��
    '/shopping',
    '/ugc',
    '/v1',
    '/v2',
    '/v3',
    '/v4',
    '/bos',
    '/member',
    '/promotion',
    '/eus',
    '/payapi',
    '/img',
  ]
  
  // proxy ��������
  // proxyTable: {
  //       '/api': {
  //         target: 'http://localhost:3000/', // ��������õĽӿ������Ͷ˿ں�
  //         changeOrigin: true,     // ����
  //         pathRewrite: {
  //           '^/api': '/'          
  //         }
  //       }
  //     },
  
  //�������Ǻ�̨·���кܶ������������ֱ��ʹ��ѭ�����������ñ�
  const proxyList = {} //proxy ���� ��
  // ���� ����·�� �����ɴ������������Ⱪ¶
  module.exports = function () { //module.exports ģ�鵼��
    context.map((item) => {
      proxyList[item] = {
        target: 'http://39.106.104.0:8888/', // ��������õĽӿ������Ͷ˿ں�
        changeOrigin: true, // ����
        pathRewrite: {
          [`^${item}`]: item
        }
      }
    })
    return proxyList
  
  }