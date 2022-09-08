import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  return knex('dai_balances').insert([
    {
      address: '0x937a0c4697e5551ba3a50f8beb279ed0a71d08b5',
      balance: '1579999999725943',
    },
    {
      address: '0x9008d19f58aabd9ed0d60971565aa8510560ab41',
      balance: '146658879814291865214',
    },
    {
      address: '0x9b45322ade3d76552944af74950607054fd5b342',
      balance: '0',
    },
    {
      address: '0x28c6c06298d514db089934071355e5743bf21d60',
      balance: '3753863392546880476298396',
    },
    {
      address: '0x752b26b4375a3e2063858043eeb2ec2f47bc772e',
      balance: '1',
    },
    {
      address: '0x5777d92f208679db4b9778590fa3cab3ac9e2168',
      balance: '418560114934173301985496268',
    },
    {
      address: '0x0ba577b7e9096156af0d3a44e5056491566b7289',
      balance: '196052070808104438386092',
    },
    {
      address: '0xae461ca67b15dc8dc81ce7615e0320da1a9ab8d5',
      balance: '25071427275197757577086241',
    },
    {
      address: '0x60594a405d53811d3bc4766596efd80fd545a270',
      balance: '2565192811452009341681863',
    },
    {
      address: '0xd8c07491caa1edf960db3ceff387426d53942ea0',
      balance: '108812486029452700858582',
    },
    {
      address: '0x924cd613428f170e34491b86e7f8b3560efcfe16',
      balance: '629899124945245273957719',
    },
    {
      address: '0x95ecfcc073f1d768be35839dd27724a0aed78e60',
      balance: '0',
    },
    {
      address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      balance: '33994334204002137315095310',
    },
    {
      address: '0x7d6c4614f6509284e279d1094ea662eae7f769a9',
      balance: '0',
    },
    {
      address: '0xf2f400c138f9fb900576263af0bc7fcde2b1b8a8',
      balance: '0',
    },
    {
      address: '0x48da0965ab2d2cbf1c17c09cfb5cbe67ad5b1406',
      balance: '396604709142258017054010',
    },
    {
      address: '0x6d11bcb2e93ef39f5f97dd01cbb68830f77730bb',
      balance: '6380404210327',
    },
    {
      address: '0xe592427a0aece92de3edee1f18e0157c05861564',
      balance: '0',
    },
    {
      address: '0x0000000000007f150bd6f54c40a34d7c3d5e9f56',
      balance: '4507732512852038392',
    },
    {
      address: '0x3058ef90929cb8180174d74c507176cca6835d73',
      balance: '3904841182967284684162034',
    },
    {
      address: '0x00000000ae347930bd1e7b0f35588b92280f9e75',
      balance: '4130665556149266839862424',
    },
    {
      address: '0x91485c87554716011f7738246899bc7b383d8bb6',
      balance: '0',
    },
    {
      address: '0x7448458aabc863f70b2ef4f3f42913e8f935e720',
      balance: '0',
    },
    {
      address: '0x74de5d4fcbf63e00296fd95d33236b9794016631',
      balance: '0',
    },
    {
      address: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
      balance: '301101906765881009670781846',
    },
    {
      address: '0xed279fdd11ca84beef15af5d39bb4d4bee23f0ca',
      balance: '0',
    },
    {
      address: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
      balance: '9928711602824325613958772',
    },
    {
      address: '0x6e80e77a33d0567f09e3a04dba1e8f4f01f7b1a9',
      balance: '6305750309078683246',
    },
    {
      address: '0x6f48eca74b38d2936b02ab603ff4e36a6c0e3a77',
      balance: '803193975210407219869871',
    },
    {
      address: '0x6f59ddbdf6a99cd6c9d215d88a7362231b57d207',
      balance: '19067070267838821117938',
    },
    {
      address: '0x945bcf562085de2d5875b9e2012ed5fd5cfab927',
      balance: '17427302763672495065342',
    },
    {
      address: '0xbb2fba21219d10c8b28e7330422a93c7573508ca',
      balance: '7327063481944883457772',
    },
    {
      address: '0xc0825169485ed2aa98072ada74b254b8128c0018',
      balance: '5000000000000000000',
    },
    {
      address: '0x739ca6d71365a08f584c8fc4e1029045fa8abc4b',
      balance: '676297989609822312194464',
    },
    {
      address: '0x2796317b0ff8538f253012862c06787adfb8ceb6',
      balance: '2360626169079379215996070',
    },
    {
      address: '0x9a79a11b2c681c7f245fbb462d0263b99c3f3e72',
      balance: '0',
    },
    {
      address: '0xbeefbabeea323f07c59926295205d3b7a17e8638',
      balance: '962609688726884527559528',
    },
    {
      address: '0x8faf958e36c6970497386118030e6297fff8d275',
      balance: '688204217906341788195067',
    },
    {
      address: '0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8',
      balance: '9775603429726524073852495',
    },
    {
      address: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
      balance: '7536039770424241038185507',
    },
    {
      address: '0xaa4f982c1bee0cb94e9125eaa96ca87611874fb9',
      balance: '0',
    },
    {
      address: '0x7a31c729b04c40d7f351744b9b49639de38f1f7d',
      balance: '3450000000000000000000',
    },
    {
      address: '0x66ceac5ee8f093059c4bc9628c06e63076505b15',
      balance: '1079671848017852089498641',
    },
    {
      address: '0xd79b937791724e47f193f67162b92cdfbf7abdfd',
      balance: '417699816207063443',
    },
    {
      address: '0xc3d03e4f041fd4cd388c549ee2a29a9e5075882f',
      balance: '4381195441811288663099246',
    },
    {
      address: '0x2e8ffe5d9eac2e3d3ff9e64e74d267360bd3df7f',
      balance: '0',
    },
    {
      address: '0x52844247eeca0100d1eef8c065c0ada2b6aad811',
      balance: '44675930671244397',
    },
    {
      address: '0x7515be43d16f871588adc135d58a9c30a71eb34f',
      balance: '385070487330392698065546',
    },
    {
      address: '0xec54859519293b8784bc5bf28144166f313618af',
      balance: '1785742796309938831932144',
    },
    {
      address: '0xcb0c5d9d92f4f2f80cce7aa271a1e148c226e19d',
      balance: '2113213159980823457994392',
    },
    {
      address: '0xff1f2b4adb9df6fc8eafecdcbf96a2b351680455',
      balance: '1037461641966727568601504',
    },
    {
      address: '0xe1635e21e203fe1eb0ae2b030f1ac208b47f8cd3',
      balance: '90000000000000000000000',
    },
    {
      address: '0x566cc3c77ad1b2dbf12928fe73709a2deefa4e5a',
      balance: '10488872849566768537',
    },
    {
      address: '0x055475920a8c93cffb64d039a8205f7acc7722d3',
      balance: '6545618799881382754737868',
    },
    {
      address: '0x6d1a89e965678eb0a21cf8c7dbbb0e52d3e9f408',
      balance: '0',
    },
    {
      address: '0x713d12245de21712d5d9672660171176e1ce858e',
      balance: '0',
    },
    {
      address: '0x391e8501b626c623d39474afca6f9e46c2686649',
      balance: '1472052464362985171664980',
    },
    {
      address: '0x5f62593c70069abb35dfe2b63db969e8906609d6',
      balance: '596931851654356721',
    },
    {
      address: '0xd9c4f0d36dbfa6d4f2268826c01b013c294f7fda',
      balance: '1297472994424076465319',
    },
    {
      address: '0x6cc5f688a315f3dc28a7781717a9a798a59fda7b',
      balance: '4049706254062617632411660',
    },
    {
      address: '0x3f45592423e881b225205548b986fda630c2bd48',
      balance: '2429009000000000000000',
    },
    {
      address: '0x70b1bcb7244fedcaea2c36dc939da3a6f86af793',
      balance: '19939617499085672787',
    },
    {
      address: '0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43',
      balance: '1560709639486371358702889',
    },
    {
      address: '0xcecf6b26938a3922a1f5d28623aa9ee12f474481',
      balance: '0',
    },
    {
      address: '0xfd6c2d2499b1331101726a8ac68ccc9da3fab54f',
      balance: '7093472975106624000000',
    },
    {
      address: '0xd1000344c3a00846462b4624bb452621cf2ce001',
      balance: '9643695083742310101878',
    },
    {
      address: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
      balance: '7867987',
    },
    {
      address: '0x7240a90351930bca7d7154c5fa918079e9bc8e2d',
      balance: '0',
    },
    {
      address: '0xe4000004000bd8006e00720000d27d1fa000d43e',
      balance: '164279544126090468898',
    },
    {
      address: '0xfd0000000100069ad1670066004306009b487ad7',
      balance: '151',
    },
    {
      address: '0x288931fa76d7b0482f0fd0bca9a50bf0d22b9fef',
      balance: '0',
    },
    {
      address: '0xf3194e22d3212a6f930a7c6a88003d43f68befab',
      balance: '176840472478550408238',
    },
    {
      address: '0xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf',
      balance: '0',
    },
    {
      address: '0x4f868c1aa37fcf307ab38d215382e88fca6275e2',
      balance: '519835511900606842320387',
    },
    {
      address: '0xafec37c0a5eecb84f5644d7ec09ed2e18bc982f6',
      balance: '0',
    },
    {
      address: '0xbadc0defafcf6d4239bdf0b66da4d7bd36fcf05a',
      balance: '2',
    },
    {
      address: '0x00000000c2cf7648c169b25ef1c217864bfa38cc',
      balance: '129839967405356592396',
    },
    {
      address: '0x000000000dfde7deaf24138722987c9a6991e2d4',
      balance: '2765009146943087375247768',
    },
    {
      address: '0x495f8ef80e13e9e1e77d60d2f384bb49694823ef',
      balance: '1852950173246022688759661',
    },
    {
      address: '0xdb7a53e6ae058e1dcf4502341e2adfa522e2b29f',
      balance: '0',
    },
    {
      address: '0x806c90dba58a9b395ac823111d62db5c6e0f05bf',
      balance: '72346238825',
    },
    {
      address: '0x2f13d388b85e0ecd32e7c3d7f36d1053354ef104',
      balance: '25520270854000000000000',
    },
    {
      address: '0x60a26d69263ef43e9a68964ba141263f19d71d51',
      balance: '1082199420848897737023807',
    },
    {
      address: '0x48c04ed5691981c42154c6167398f95e8f38a7ff',
      balance: '1753299459310318837000',
    },
    {
      address: '0x2d6b9f709b501bac7d24297c66332fa33fd1a847',
      balance: '0',
    },
    {
      address: '0x40462d0415cc99a75cd3d512e90af8587f58a889',
      balance: '1684373510253018614',
    },
    {
      address: '0x2e26066273662b8659109f244151c8720c3c04b3',
      balance: '0',
    },
    {
      address: '0xf287a8ae4b2a5e4b88a5a28e604adbcc693dbf13',
      balance: '0',
    },
    {
      address: '0xcc5ab3f04704620d6f20a0cf2e772d6a81f42c4b',
      balance: '462370192665178905378690',
    },
    {
      address: '0x97d9877ff71e514864f7bfc37abda73d13245f55',
      balance: '184170601857463512917003',
    },
    {
      address: '0xa80964c5bbd1a0e95777094420555fead1a26c1e',
      balance: '317285005535823522566504',
    },
    {
      address: '0x75bff91af9878f5ec3fede9b52d51159afc2430a',
      balance: '683454622552083382812549',
    },
    {
      address: '0x97e7d56a0408570ba1a7852de36350f7713906ec',
      balance: '11801508772240556950844130',
    },
    {
      address: '0x5c57ac8dc5d8589dab9d422993ed3de8cc244151',
      balance: '75605606350660256',
    },
    {
      address: '0xf8d9b577cf19957c453953a02c42b3392c129ca1',
      balance: '773113828431209964262',
    },
    {
      address: '0xe6b5cc1b4b47305c58392ce3d359b10282fc36ea',
      balance: '0',
    },
    {
      address: '0x5522c339d35a6c3e5f328c8746bdf88f599dab83',
      balance: '77586227965933942515467',
    },
    {
      address: '0xf43e1b9d83c9672ddade2d830528e1a4f9a82869',
      balance: '0',
    },
    {
      address: '0x1fc943488f821cc25968d9836cf606a6c36e286e',
      balance: '0',
    },
    {
      address: '0xafbd82b33e0fb070da19684be3f3db03d62edb21',
      balance: '0',
    },
    {
      address: '0x0437465dfb5b79726e35f08559b0cbea55bb585c',
      balance: '147784992603741922981194',
    },
    {
      address: '0xfffb609cda6131468b17391e6e4f3124cf180333',
      balance: '0',
    },
    {
      address: '0xa79828df1850e8a3a3064576f380d90aecdd3359',
      balance: '0',
    },
    {
      address: '0x3d71d79c224998e608d03c5ec9b405e7a38505f0',
      balance: '44861892070336776965024',
    },
    {
      address: '0x94111d612e9d7a08f91e8e5d851f1cb8303f8ae2',
      balance: '77556372862527472929603',
    },
    {
      address: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      balance: '0',
    },
    {
      address: '0x682831244b0e97946abc52cb1893cce398de3a35',
      balance: '75473433432178515433249',
    },
    {
      address: '0x3a7b89a58a1362a25ef109380dda2859b3b52f3e',
      balance: '58204582999999973949440',
    },
    {
      address: '0x16980c16811bde2b3358c1ce4341541a4c772ec9',
      balance: '207452534796097507142037',
    },
    {
      address: '0x8788a7cfd63cf06d0d7716c6a66f54b58248c896',
      balance: '0',
    },
    {
      address: '0x5f13cf73c6fb0e9638924ef66594e25e5ca4fffd',
      balance: '0',
    },
    {
      address: '0x9ce6561cd3202f4373eaafde185a462d72bc3434',
      balance: '0',
    },
    {
      address: '0xd7c09e006a2891880331b0f6224071c1e890a98a',
      balance: '0',
    },
    {
      address: '0x63503d2809ecc72f337d562f54b05ab5f18a8457',
      balance: '0',
    },
    {
      address: '0x22de0b5c40f012782a667ccdaa15406ba1201246',
      balance: '402111862479920042130963',
    },
    {
      address: '0x2b57c8a4666480d7bbabd6cdf8b103c3574bf9bd',
      balance: '0',
    },
    {
      address: '0x23dced77743433d8b0d97971dd8b4682767bfaf7',
      balance: '0',
    },
    {
      address: '0x0000d2fa2d0000a58c0000c300720b0ee3b02a81',
      balance: '43919957565410877',
    },
    {
      address: '0x1111111254fb6c44bac0bed2854e76f90643097d',
      balance: '0',
    },
    {
      address: '0x048c8b5b66df058b2660f46e9875b6775ce8c3a5',
      balance: '0',
    },
    {
      address: '0x7691a1137b8979f6889819389fd98eddf74dd21c',
      balance: '0',
    },
    {
      address: '0x028171bca77440897b824ca71d1c56cac55b68a3',
      balance: '192562771562961306361764824',
    },
    {
      address: '0xd09f16830172e6073e8e5ee5053f35010f1c7d7a',
      balance: '0',
    },
    {
      address: '0x27239549dd40e1d60f5b80b0c4196923745b1fd2',
      balance: '0',
    },
    {
      address: '0x9a215304d686fe6ab67c79c3c273856798f8696d',
      balance: '12594503412510161661951',
    },
    {
      address: '0x2542549517ee2dd58e550db22a104a05035e5016',
      balance: '193231543033612130612435',
    },
    {
      address: '0xc3529a3efe65ac497423d4d0baa596d49b4cefb8',
      balance: '0',
    },
    {
      address: '0xfc92cd7324317818f1f59e3e71583a7f879a7c80',
      balance: '0',
    },
    {
      address: '0xf6316fc3f3165afe493badc6a83e1c9f2b40d99d',
      balance: '0',
    },
    {
      address: '0xfc855cf166c5451240a19b201d772f3395ef4fb0',
      balance: '0',
    },
    {
      address: '0x5dcc39c7795092d413975a04e308b5a72eb9460f',
      balance: '387964381610000000000',
    },
    {
      address: '0x1485e9852ac841b52ed44d573036429504f4f602',
      balance: '1100731895236107349102345',
    },
    {
      address: '0x8e77b367fe90d91b3f56be198ded811b74c82be3',
      balance: '0',
    },
    {
      address: '0x039fb82abe48795679609cee6547d9566a646a71',
      balance: '0',
    },
    {
      address: '0x0315209ebfa59e9595e3da14a54becaae310c9f8',
      balance: '6523983840773674296639',
    },
    {
      address: '0x2a1530c4c41db0b0b2bb646cb5eb1a67b7158667',
      balance: '207277222636202562089663',
    },
    {
      address: '0xed77777586d73c58eb4d6bebdf9c85c2d5f56c2d',
      balance: '25709671066967098623098',
    },
    {
      address: '0xc88916314feffb2ab115c38eebf039a5c9be9666',
      balance: '1000000000000000001',
    },
    {
      address: '0x9bd82673c50acb4a3b883d61e070a3c8d9b08e10',
      balance: '582312583483349715524802',
    },
    {
      address: '0x0000000000000000000000000000000000000000',
      balance: '8924753589358457656739',
    },
    {
      address: '0x6a6fe5d9060ca10866620af8ad500e2402c7199f',
      balance: '10381757327788640059336',
    },
    {
      address: '0x6c6bc977e13df9b0de53b251522280bb72383700',
      balance: '314708747889832208625759523',
    },
    {
      address: '0x092485cce4e9e60789e75eefc1da2d4f6499f55e',
      balance: '26799715471767584519316',
    },
    {
      address: '0x748ff56a15e63a49ef74371b14d14ca91da54788',
      balance: '0',
    },
    {
      address: '0x00000000008c4fb1c916e0c88fd4cc402d935e7d',
      balance: '1460302266919539931308224',
    },
    {
      address: '0x6d0da23c433f83879cd820ecc451d445e168cae7',
      balance: '122221330833103182901376',
    },
    {
      address: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
      balance: '0',
    },
    {
      address: '0x44fa3d570f1838dcf079ac7d19b8f2d23e2b889f',
      balance: '36601262620923193550604',
    },
    {
      address: '0x0075f029648ffbd2026a7df1e9eff27ebc90ca65',
      balance: '18337517870638444775516',
    },
    {
      address: '0xe48c10ccbaf94fb0d81bfb743449febc614e8b4a',
      balance: '3241386347595400448',
    },
    {
      address: '0x9e4c98a6e67f2ad1ea41e37536e86a22bb445b4a',
      balance: '11373189237606993303094',
    },
    {
      address: '0x12d3078f6e97deadd5dfad6605c973e0b634fe2c',
      balance: '0',
    },
    {
      address: '0x7f517657496c09c43cc28d0ca131e35dcd557e02',
      balance: '43085437102875994112276',
    },
    {
      address: '0x890ff7533ca0c44f33167fdeeeab1ca7e690634f',
      balance: '5141229730374971386399',
    },
    {
      address: '0xb6260b8b0bcdcbb7a57f86b074a7e03a095106f0',
      balance: '2612178620202310347973140',
    },
    {
      address: '0xb50cc1710262b7606db988cbd476d5af72e99f52',
      balance: '0',
    },
    {
      address: '0xbf18e63acb699a71c1c8f03588b5a5b2ab2e4e9e',
      balance: '2500000000000000000000000',
    },
    {
      address: '0x8509ba673aa898dd0f28cb0a809af0d38c4e5a45',
      balance: '0',
    },
    {
      address: '0x29d5527caa78f1946a409fa6acaf14a0a4a0274b',
      balance: '119996897029404333212144',
    },
    {
      address: '0x5b63aac2abd5f20a665038688e81e24d281994af',
      balance: '156261596319157488261902',
    },
    {
      address: '0xe2c16c308b843ed02b09156388cb240ced58c01c',
      balance: '744905919816414971766238',
    },
    {
      address: '0x3c267dfc8ba8f7359af0d8afc45b43731173236d',
      balance: '0',
    },
    {
      address: '0x0000000000a84d1a9b0063a910315c7ffa9cd248',
      balance: '0',
    },
    {
      address: '0x5f65f7b609678448494de4c87521cdf6cef1e932',
      balance: '5578567418538363094554634',
    },
    {
      address: '0x3961aed461f1e483212c02a47da61af15c6a96e9',
      balance: '0',
    },
    {
      address: '0x0d38a181e4d2c44d691535956dc3b23882b164a8',
      balance: '0',
    },
    {
      address: '0x61c3b513a078bfe09c996cc9b6cfa45d427e33e3',
      balance: '929174104078361653561',
    },
    {
      address: '0x66c57bf505a85a74609d2c83e94aabb26d691e1f',
      balance: '19362184285006668874038340',
    },
    {
      address: '0xe3bb4450997f74fc41577e720c082c0435ee931d',
      balance: '0',
    },
    {
      address: '0x40ec5b33f54e0e8a33a975908c5ba1c14e5bbbdf',
      balance: '136493745785088419430875089',
    },
    {
      address: '0xaf104ef97282c69ff874a2f28717b7623914f657',
      balance: '0',
    },
    {
      address: '0x9d7e5647ce3c7c2d835f2f5e82c8fdb36b0bb0fe',
      balance: '12462436419128915379503',
    },
    {
      address: '0x89d3afde089399534afdb7ad2d05138315ef45ff',
      balance: '105398842887370605550',
    },
    {
      address: '0x78755bc12c6742de3d2957b918d96d60876bd288',
      balance: '0',
    },
    {
      address: '0xf8ab3367a216fe84e381be4fc6d048819ea56923',
      balance: '0',
    },
    {
      address: '0x045ff23cf3413f6a355f0acc6ec6cb2721b95d99',
      balance: '1021400000000000000000',
    },
    {
      address: '0xa83292a3ebf2e6473c457cc6b01e015d9858b176',
      balance: '4572974484983377321',
    },
    {
      address: '0xfdd2fc2c73032ae1501ef4b19e499f2708f34657',
      balance: '75923793602215078758128',
    },
    {
      address: '0x87986ae1e99f99da1f955d16930dc8914ffbed56',
      balance: '2454198897074936481560552',
    },
    {
      address: '0x8f8dc9786154d159bc7e60966a8cdbf0cb9ada33',
      balance: '0',
    },
    {
      address: '0x7d8c70c2fd78aa8c40ca17000ea227101ff32f61',
      balance: '100000',
    },
    {
      address: '0x0055ae46f700bcc53b1b00483d64000d47007200',
      balance: '0',
    },
    {
      address: '0x91000060399502550000007bbfba0052f47b008a',
      balance: '1495377656097076476',
    },
    {
      address: '0x0eae044f00b0af300500f090ea00027097d03000',
      balance: '8097647790744030410904',
    },
    {
      address: '0xc5578194d457dcce3f272538d1ad52c68d1ce849',
      balance: '52092061768733207447741',
    },
    {
      address: '0xad95a5fe898679b927c266eb2edfabc7fe268c27',
      balance: '79500956409539060634',
    },
    {
      address: '0xd632f22692fac7611d2aa1c0d552930d43caed3b',
      balance: '0',
    },
    {
      address: '0x03d8bf184d18201857c7112d793ed939a5b530fd',
      balance: '20000000000000000000000',
    },
    {
      address: '0xaed95f03d86dfdb6a511ded1c24ced673ea707b2',
      balance: '0',
    },
    {
      address: '0x41cda7a15493be69018f9875ab15dac58c361d28',
      balance: '0',
    },
    {
      address: '0x50379f632ca68d36e50cfbc8f78fe16bd1499d1e',
      balance: '4034493358135202065740',
    },
    {
      address: '0xc470d5a8ab1932c9c28e9cbf650ab80816512b69',
      balance: '4519173474269937380395',
    },
    {
      address: '0x954ed22d959ee732c1a324df49b75ae5459c85c9',
      balance: '3543401724335485139998',
    },
    {
      address: '0xbb2e5c2ff298fd96e166f90c8abacaf714df14f8',
      balance: '2090055694460226014392675',
    },
    {
      address: '0xcbd53fa60a71afeb07f94e1fef90d6783f63380f',
      balance: '0',
    },
    {
      address: '0x11b14bcc67996bb5e90ce9c594bc6ba836fb6771',
      balance: '15843267000000000000',
    },
    {
      address: '0x3caf44619542fdbf70b0084bae39a961c5c324e6',
      balance: '0',
    },
    {
      address: '0x0811e185bfbf3119b0ea7a24b77a7e972fa4684d',
      balance: '201004954949700000000',
    },
    {
      address: '0x2edc61d79b180fbc43144ac7a0b0b20429055ccb',
      balance: '0',
    },
    {
      address: '0xc9998e3850ceda76ba8234f18b5dbb1583c0f064',
      balance: '11348686465660350405546',
    },
    {
      address: '0x13cf07d02f4f1edf62c9a9cc8bca5e7f0bc69f5b',
      balance: '0',
    },
    {
      address: '0xf1e534bc61309d3ce53052e9c3b88b28413f55ec',
      balance: '0',
    },
    {
      address: '0xa58c83a5333686d4789460effcaf84b09729fd34',
      balance: '0',
    },
    {
      address: '0x06f8344e550eab071617c07047214489e2c970f5',
      balance: '1278299413193015781310',
    },
    {
      address: '0x6c8dd0e9cc58c07429e065178d88444b60e60b80',
      balance: '482955159177490341',
    },
    {
      address: '0x045b32ac748a32177e8f3acf630d3205e2315116',
      balance: '0',
    },
    {
      address: '0xec1b99769edda0e9782f9a6d82fefa08be8b7782',
      balance: '3250694574012205461',
    },
    {
      address: '0x34d7d7aaf50ad4944b70b320acb24c95fa2def7c',
      balance: '21850570161582353688394',
    },
    {
      address: '0x31e1c86c87791c903ccb82726e11a761187ef694',
      balance: '0',
    },
    {
      address: '0xfaae527d5497d24f78f11097e45b90406567d81e',
      balance: '8009227770875677712218',
    },
    {
      address: '0xe68c1d72340aeefe5be76eda63ae2f4bc7514110',
      balance: '55865528237726918522152',
    },
    {
      address: '0x2f4f2c9f5dbe8bad7ee4b05d1dd3c55f2f594a62',
      balance: '27027395548044200000000',
    },
    {
      address: '0x1d22397edfc4edf622d692050635bfc1febf1404',
      balance: '1280269025588200448504051',
    },
    {
      address: '0xccb8e090fe070945cc0131a075b6e1ea8f208812',
      balance: '0',
    },
    {
      address: '0x000107b175548ec4c88d2d5b6098a480a1a78e86',
      balance: '0',
    },
    {
      address: '0x85fc18547a0b150d778c704f7db1bb7b7eda9379',
      balance: '0',
    },
    {
      address: '0xdfd8dbf8c15077d784f863f42834278a04efdb6b',
      balance: '0',
    },
    {
      address: '0xbb7d765a95f96a75291be8d33c8b66e837564d6e',
      balance: '42981070760000000000',
    },
    {
      address: '0x89550234bfbd3600c730922db431f3db4922f8a5',
      balance: '0',
    },
    {
      address: '0x876eabf441b2ee5b5b0554fd502a8e0600950cfa',
      balance: '476765931188259896039808',
    },
    {
      address: '0x968cef5a0a90fa1a7fd90e8860736cf86b93faf5',
      balance: '0',
    },
    {
      address: '0x6bd7f00fc00b547f4a7aad20f9a6511c8ae13087',
      balance: '79513916452493795693350',
    },
    {
      address: '0xc25b59d9f5411a0d1286a7fa3412f39fc2d3f2eb',
      balance: '0',
    },
    {
      address: '0x28c1eaeab9dd3d95fe1ef99cb97f5977fce8c3ef',
      balance: '158350893394800000000',
    },
    {
      address: '0xf847ee31ed95202e81b4e2a4a5f54e044d119b1d',
      balance: '0',
    },
    {
      address: '0xc17964fe37d5d555724b1eaf60f4eb59f581c77f',
      balance: '392112336258711090891',
    },
    {
      address: '0x18cf4c62865c063c247b2c971b60be5f1f8b0c8d',
      balance: '8067069623490644877017',
    },
    {
      address: '0xe140bb5f424a53e0687bfc10f6845a5672d7e242',
      balance: '167',
    },
    {
      address: '0x8d21e858a12e370e2cac50934e56b1c52dcd64b4',
      balance: '5500081298371948425329',
    },
    {
      address: '0xeb0fd912e9035f41d04d9b61e591271d0199b5d9',
      balance: '18878064551874484365790',
    },
    {
      address: '0x3edfa32b084c48a9b29d691dcf853f319b0a3fb1',
      balance: '15365285046521166000',
    },
    {
      address: '0x2be78d317ab326abefed0eb748932c499c961dde',
      balance: '0',
    },
    {
      address: '0x1c727a55ea3c11b0ab7d3a361fe0f3c47ce6de5d',
      balance: '240952387937563324978003',
    },
    {
      address: '0xa2b567e9444915d5b2542fcce61511dc332594b5',
      balance: '0',
    },
    {
      address: '0x6326472cfb19a99306ed3baa9cb56b394b00f73f',
      balance: '0',
    },
    {
      address: '0xcb8e690062050617c5921a0da7df30a1a72d76fe',
      balance: '46077069178180897822612',
    },
    {
      address: '0xf53a5f18e6bc8d87d129e4ab37ae4434f5ed1fab',
      balance: '0',
    },
    {
      address: '0xa91a72e7508904d264c3cba16ecefe7cc7672585',
      balance: '1039924974982577203801658',
    },
    {
      address: '0x8728556745e8d1ca1c7cc604df2d74b603fe2a53',
      balance: '0',
    },
    {
      address: '0x0a0da65054e76cc0a5e112ea379ec2dc343b7ada',
      balance: '99720279108133200000',
    },
    {
      address: '0x6a43e60d5520912d20f19eb29a011e82a6ee50ae',
      balance: '64',
    },
    {
      address: '0x3ddc0d8b59c05cae4e4102307305cf3fbe7cd01c',
      balance: '36480207146000000000000',
    },
    {
      address: '0xc87f734accfb9a8c60539617e26f1b9b939ce27a',
      balance: '0',
    },
    {
      address: '0xa74fc1f2598d26524e4e9f8c422863031e0420a5',
      balance: '10990802004064465155',
    },
    {
      address: '0x5110486a9e2bcdcd0f5d7a78c3482546554e7f8d',
      balance: '498821767109292051195',
    },
    {
      address: '0xf4e4802b521458380ccfee452d6f9b8b3fd6cef0',
      balance: '2185480346510000000000',
    },
    {
      address: '0x5ba832834d36d15fc38ec47b9bb8751f932eeefd',
      balance: '0',
    },
    {
      address: '0x6f5f09187db624bb529c6778c9145e5cf4472c98',
      balance: '13382294571440000000000',
    },
    {
      address: '0x3cee0c19837441ffe12ffa6ae4fd28fb2f4298d8',
      balance: '0',
    },
    {
      address: '0xbc33a1f908612640f2849b56b67a4de4d179c151',
      balance: '154762639856772635884561',
    },
    {
      address: '0xdef171fe48cf0115b1d80b88dc8eab59176fee57',
      balance: '0',
    },
    {
      address: '0xe70adbcf8b5b24369530340f5f7a417560d0dcad',
      balance: '0',
    },
    {
      address: '0xfe0fa0b2faed48bae69b0da71849e08dcfb2e737',
      balance: '0',
    },
    {
      address: '0x90e18a6920985dbacc3d76cf27a3f2131923c720',
      balance: '792539627000000000',
    },
    {
      address: '0xee0bc8786e9b86e7987a0fbf484a3b9cf1a8ccc6',
      balance: '890278976252639304',
    },
    {
      address: '0x0147784fb940dc352f902768e682b43dfb3c34dd',
      balance: '0',
    },
    {
      address: '0x8ddfb806ed60a1f7e284d86ee30cb5d9950f9ffc',
      balance: '4905706387689632417574',
    },
    {
      address: '0xf00e80f0de9aea0b33aa229a4014572777e422ee',
      balance: '9711580323664833041642',
    },
    {
      address: '0x8cb8f052e7337573cd59d33bb67b2acbb65e9876',
      balance: '77974983453175479327713',
    },
    {
      address: '0x0f47ee70e8dc28ca3479e5d85254315f52e791e3',
      balance: '7874926201940649565768',
    },
    {
      address: '0x1bcd6b0e97b51d76fd1752111a1fe2b473f655ee',
      balance: '2081022272416517152268',
    },
    {
      address: '0x302e9868e092d31d5d7839e8bc87b73308900603',
      balance: '0',
    },
    {
      address: '0x4230c402c08cb66dcf3820649a115e54661fce9d',
      balance: '736078386250728933520586',
    },
    {
      address: '0x610d7053f4ca90d50ddee40d48a1fa2d32942c86',
      balance: '2399831889523500162200',
    },
    {
      address: '0xd16e4cdb153b2dcc617061174223a6d4bfae53f5',
      balance: '346921587842898179484723',
    },
    {
      address: '0x0c64bbeba5a9bafc021698721ea0765fcf25ab90',
      balance: '0',
    },
    {
      address: '0x679fa5155200613ea157efa22038c69c8f1543ad',
      balance: '0',
    },
    {
      address: '0x4bd61a6e6d2b305d193ac7ac9d5461d0d7a9901c',
      balance: '241000376572023218500259',
    },
  ]);
}
