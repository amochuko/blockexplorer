'use client';
import { timeAgo, truncateHexString } from '@/utils/lib';
import { ethProvider } from '@/utils/provider';
import { Block } from '@ethersproject/providers';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from '../../hoc/error-boundary';
import './block-latest.scss';

export function LatestBlocks() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [error, setError] = useState<any>({});
  const provider = ethProvider();

  const getBlocksEvent = useCallback(async (num: number) => {
    try {
      const blk = await provider.getBlock(num);

      setBlocks((prevBlk) => [...prevBlk!, blk]);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  // subscribe to block event
  const subscribeToBlocks = useCallback(() => {
    provider.on('block', getBlocksEvent);
  }, [getBlocksEvent]);

  // unsubscribe to block event
  const unsubscribeToBlocks = useCallback(() => {
    provider.off('block', getBlocksEvent);
  }, [getBlocksEvent]);

  useEffect(() => {
    subscribeToBlocks();

    return () => {
      // clean up
      unsubscribeToBlocks();
    };
  }, [blocks, getBlocksEvent, subscribeToBlocks, unsubscribeToBlocks]);

  return (
    <ErrorBoundary>
      <div className='latest-block'>
        {error.message ? (
          <p>{error.message}</p>
        ) : (
          <>
            <div className='header-block'>
              <h3>Latest Blocks</h3>
            </div>

            <div className='body'>
              <ul className='unordered-list'>
                {block.length > 0 &&
                  block
                    .filter((_, i) => i < 5)
                    .map((blk, i) => (
                      <li key={blk.number + Math.random() * i} className='list'>
                        <div className='first-block'>
                          <span className='icon'>🧱</span>
                          <span className='title'>Block: </span>
                          <Link className='links' href={`block/${blk.number}`}>
                            {blk.number}
                          </Link>{' '}
                          <span className='time'>
                            {timeAgo(blk.timestamp)} secs ago
                          </span>
                        </div>
                        <div className='second-block'>
                          <p className='text'>
                            <span className='title'> Fee Reciepient: </span>
                            <Link
                              className='links'
                              href={`/address/${blk.miner}`}
                            >
                              {truncateHexString({
                                hexString: blk.miner,
                                letterCount: 4,
                                positon: 'middle',
                                isEthAddress: true,
                              })}
                            </Link>
                          </p>
                        </div>
                        <div className='third-block'>
                          <p>
                            <Link
                              className='links'
                              href={`/txn?block=${blk.number}`}
                            >
                              {blk.transactions.length} txns
                            </Link>{' '}
                            <span>in {timeAgo(blk.timestamp)} secs</span>
                          </p>
                          <span className='tx_value'>{0.23} Eth</span>
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
            <div className='footer-block'>
              <Link href={'/blocks'}>view all blocks -&gt;</Link>
            </div>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

const block = [
  {
    hash: '0x8775059ef5e4275cbbcabdb82d0dd15701ecd4e25d1f3eab3c793ae69a1241db',
    parentHash:
      '0x938dee23b3975859c8b02d390b51cbae23bbeccab87c1688e5e0900e7a9d3490',
    number: 9561016,
    timestamp: 1692696528,
    nonce: '0x0000000000000000',
    difficulty: 0,
    gasLimit: {
      type: 'BigNumber',
      hex: '0x01c9c380',
    },
    gasUsed: {
      type: 'BigNumber',
      hex: '0x0151cc8d',
    },
    miner: '0xf36F155486299eCAff2D4F5160ed5114C1f66000',
    extraData: '0xd883010b06846765746888676f312e32302e33856c696e7578',
    transactions: [
      '0x3cded88cd81054dbff6c02b7e8f64b434372d8c7aac344da518790fde71a4d08',
      '0xa16d3d4575eaf13089f6c9400378c5f12a7489dde307e57c3d203a01a9c8ae40',
      '0x448b1f322ef8904ac625447bd507a2903ed4980d515fc236acead51ea38799c6',
      '0xb5aa43ecf386f4db4be5338f4fffe1b8b965df93fbd50e5e4f7313588fe45c8d',
      '0xf44f8fea474b854255ef59da883c8db3540a7229ede92f798aefcba23a828ff6',
      '0x60daeced1d2f252c6f1fa84f2e5ae21cda7bb2efb744f3c957e74d0f8d390039',
      '0xf2de7321f3ca634a435fcd29ddf9ab5c8133de05c6d6b76c26d1f1f8d84ec302',
      '0xb70db7c684c515abe4bfa09c51629b428d789dcf4f49cedb0928d31d6a318c72',
      '0x3a9d78d021c4910ca33345af760acf4bc6c73e8337996f26986ccd0a5bfdb186',
      '0x146369331d92a40d471f38e72cc206a5563efe4cc7f92f31eb1096bb546adf5f',
      '0x982364bd934ad0b398ee974c30a2805a9aa75ddbe2eceba15382bc797d9b82fd',
      '0xc7068233e6ac2fb74fe6bc099c499fd6daba6f2d0fe966f4c9a51c347b239ce5',
      '0x7dd4639ed423be92730ea60d6f342254afc0845248555cc192cc695d2b1bdc2d',
      '0x9a6765953205f5db1f2c99948e3032ba929ab175863c17b7e7eb821779442df0',
      '0xdc6584cf4fff867fbe793ce4c01fd603d7f4c66b266130c3b4c2634ac294dfd4',
      '0x9af4077a08c450e267ba5c3777f9a97c6eff4684b2fdd374c8448d3e2ba6adad',
      '0x1c566b4f9867d6013755a50e2f34d14b547e2d7dd9c16c01ca016edbeac0dbb8',
      '0xc3259f18730381fba29f9ad829b5a4502444e9db85558964bd797c33282324e1',
      '0x25886282f8b74df07afabaea01b6b67d3213157aa9e4e1293bd5c8cfbdbf63d9',
      '0x34b99666fb8525abf05e9d5f0ee2482fca9e04624ac133cae217410b693a70c8',
      '0x3288f15b5e81d7ef0f5984b0c547cd9436364f05fb94c60b132c04a5562a90ab',
      '0x2e258e27c5bfbd2d3018a2f038cbeaf1bb22d0e79f17ddbd0322b94dba7f3adb',
      '0x3914c08271cd5fd978918fb394e6f4a1a3328296028a56ce7f65e793ae9d5504',
      '0xa57bde8f6dbd9729bcf87ec9a89f3acb8259044254ad356ce5b6709c10964506',
      '0xcc444b46df9d9f4a999ebc7864a23e233f9709080e7396170e4f6c3c112915dc',
      '0x3f6918e074e114e05238d58a7ccb73ad3420ba9fe6f1c575d651b43656be6ac4',
      '0x21770a2a886f3491265e5e03eab230b62ec95906187db3dc2b4e2defe79d54fb',
      '0xb9346f3884697683d33bfb6a56e9dbd0c04c730b2f3354dacbce6166ae78018f',
      '0x3d04d09f1d957bfa7d684a0e33f0622fbeba7a09ab5f01a75983f08cbec98479',
      '0x718def6daa3f6304481d41a4b5ead9b510e6304f9399e4d6b857d9fc08da33f6',
      '0x48a1af73098704859baa2d9a39580d240b92959acbdc83287099ec1c31a32979',
      '0x4d93149d0f92d6cfb4a658c0469a8b11c2ff0017bebd09f5826ae7d31bb54df1',
      '0x4260797d40ab2f8face29ed1b87364f2ec38868c322e993b7b1e187f3a31e1cd',
      '0xc40dac1c5824b44ddb1dcfdfd04ee3868a2cb59bd131831fb228fbdf39b4068c',
      '0x2c98568535bd85f46c2793bbebf4769f0d5f079d51eb9a41412fa5f346c0bffd',
      '0x289d2daa359fc8632050801d74574760b5796c1c0072d41e60d8009218e76794',
      '0x49674454c3000ba9a436582b9013337a60550921fefeb7259c0ae0a0b8de482c',
      '0x7f366250cc1bf05866d6518f200dd664f540cd3fc6ba78d1df7f2f4f2b0cbcb1',
      '0xe3347bf68348d0aa95da405cd77fd09a5925e241ce1ff8d34887a7f92720b79f',
      '0x0bebf96178139cb790ec9c618b3359368edba95f504949b0f698115eacc63468',
      '0x325747ac106e8190785c8300cb904499b5d54233b7c545e57bd5dbf3f408e77d',
      '0x1e8e9422b054d019caf2a6be92fac5c90b764106ed85fe471fa618b54290778b',
      '0xca01e24c6dfe11629bf25810a5857ef630e88f5427a7ee1190a28325e25d15a0',
      '0xb7ff9f03f4621339a4fb4052b30b1567895c40961d5214f2bab24d7dbc733d08',
      '0x70bf413d47b3b8f5c9c43fd8ce4c0a9f21369a768557a4f6f306ca9cbfb217a5',
      '0x6990b22d59461103c9dd337a436d2988b3248c8589bdf555f6436753d859f1d2',
      '0x446a5f972df5c13487cfc1ce9c7e6569591df5013f38941ae437094bfe61f726',
      '0xb50d479423d10efe69014b4fea028ea4f5bc85cc32cb762c55deaa26caf4e5e1',
      '0x708550d5bc1d0cbb2214425d3af94bc5f9fe5ac965af8c2dbd08656f49dd1786',
      '0x396218e6951d6c80a27f44f873c06fef0d39f2ff05ed292c25b780ec2f83edfb',
      '0x6ed75ca4696d252664cc406c53f9c097e35da4e1f5d57ae44b85c5a5e52a5217',
      '0xda2ea4bd41130a2a27f079229015500e81f57b7d512a782f9f44d01f52851669',
      '0xa1fa50a2d1fc843e41e7450389df9c98218b4aea9dcec2c9b340077517866f82',
      '0x96f84aadfeaf4e2bb77a24eef7bef66ac0deff381626860bfacc7f1af7390fc1',
      '0x261132c98d9f26b2fea8e72e0a199abaa73dbf179f1578aa53adc53fc2f42508',
      '0x3c3ba52cbd6394fcc51b1d1cafd7ead0490652b017edbb48ead4c42a25577f8c',
      '0xf7e062c4be7d1834c9cd854900861b964470a83eda546d20e897529854d3f57c',
      '0xe70e3b57a26e3119ef25918a621d6366d73be3413b43c9575e170d92e0e53e34',
      '0xb033de42f7536ad2e3d81e5812d4d50fb6bed8d942f0d6b92143d29ab4f4cc26',
      '0xd271542f7b6ce7d58a23197a48467c59f3f9599c1041167ffa710f4b7e2392ae',
      '0xe269a4435623cf727deb5fc05a2a663aceec297a69ce9a457e9a5bd56e993cb4',
      '0x519fbaba1b44eaea90d72c433f0c6a993e048fe76ce65361520d1ace87d8c42c',
      '0x9f28421985fe145eb411c28ac8e6265372a823de0e0298255d0b79900029e0c1',
      '0xcd9ac0aeb9c270b57b30805788c7aee365a9337972f299c2e8a5048062f9396e',
      '0xdcee5ba0a9a792c4ac00dea4e8d4a364bcda07ea8c5efe876d801642f8d0a039',
      '0x75ce3094ac83f584156353f60958bf9378be2a4d3bdb1c28e628da4f674dc17f',
      '0xb99f9373029d990c97d08ee52eaaebbdc80664e12b2da24b5140a785eb64d40e',
      '0x92730e72eec9902eb4e119c5972417358a0a906b5da971a07fbe4584f3bed614',
      '0xb22af72126126f5f0994effc10bac49620319c0ec62c4ea87bcaec4597cd56b7',
      '0xf279b409d8e72143b5e78fdd67485f5ffd71aac99a63597a49cd1d27ad67bb9f',
      '0x350fef81a680463503c66d71e63479d4ecea45a04a39c130fbba99e019b28af0',
      '0x8ba334ada09dad00b3899c4f84703caf533b4c11d642f9757d24beca7665d511',
      '0x13553d577fdfdc42c19b4132750d18978a081d8ada268a841b517208da515676',
      '0x4dc944bd9d3dde98ff0b58b3a9dcc90b3a10edb2150a6985d10297d0ef612110',
      '0xcad4475a11d5dcd8cd762e61db57f3832358b59f2f1a5ed314f2d5c4a81a4ae9',
      '0x81e2f40c01a27cfbaf491e9ff9586deb239507aa2c466d8346b4dce74c5949a9',
      '0x434f58cc108b98717a97eaa040b3a1bf39b7165b2862fba7bd16b181d9e15928',
      '0x9a08cf9fcdd1add7bfb0394981708668544e1d0efa311ce435656b9ad4650b26',
      '0x13aae04aa735765ef780a830019196cf0a8dae14ebd07aed25e1e2a010bd2da8',
      '0x75b94c9dedcc02988b5fe21451f5bbe555ba2719181c78f0d0329f17e46c9f48',
      '0x2fc76a795a4775dc11170e85b9e5deb2446c1b7fcef6c74b0ba5cbb074aa2dfb',
      '0x866440a9d190c8b512ae61df2d1e7c59dc8dcaae8ab0c98dc92067c1c0f6a8d8',
      '0xa2a38add2c8dcd4db2e88b151a2d1abecdab18423608f551a49f00dce0f452ca',
      '0xa4ee2e5bdea40f9d3600200997cc2dd54fd2b0b6e2a2799aea73d0aa96330c6f',
      '0xc8646fb5f7e4dfa88ec10162d13221101461758911176dfa1962407b81e57d85',
      '0x11c05cd70bb8ad993d0ffc1bb5d0fd1f49ab5dc27bb711702e0c2fc794ff2320',
      '0x3b8ec8f09ba1dab72b9b8422d079166d33289e7fea7873c2bd44b32df749acdc',
      '0x458f38355ab983014ea2423bec9d4576d2ec4b5a4604a438f1b1983518985d02',
      '0x41082ec1a7aa3504fcf2e360e1c47008a4680ae89c8c04334dfc6857f6cbeb2d',
      '0x6b58dc1cb69f6ce5cdcff6db3913722935d5bd3e7b16c5776d4201423a4d6f55',
      '0x2bff39f4453242ae3d34a87f4d7d0fc37e52f33fe20f9d3a81fe6802a95d9958',
      '0x137e266522839f3ab99107efaaee5ba01c5f6f178fba30ce5ecd886bc56a5539',
      '0x66b361ffc772051fb4d2460955b2decf000c082f1aefec9fff032f8eafde573c',
      '0xf74a507621272ad68ec310840790968df50ee04392b6f4248b93423c0441402f',
      '0x14f31fba90092021262a57b3b4d564678dd1d836fac59a7a77462f664f6e45c8',
      '0x5a7b886a48554ffd2e604f1f80d37b98178ed9499a17619745d11782a2afe6c3',
      '0x37e80bcec046e2d3a51e7ac8b4c368666bd911a81c4a0f0155c5e798cec138d7',
    ],
    baseFeePerGas: {
      type: 'BigNumber',
      hex: '0x0d',
    },
    _difficulty: {
      type: 'BigNumber',
      hex: '0x00',
    },
  },
  {
    hash: '0x8775059ef5e4275cbbcabdb82d0dd15701ecd4e25d1f3eab3c793ae69a1241db',
    parentHash:
      '0x938dee23b3975859c8b02d390b51cbae23bbeccab87c1688e5e0900e7a9d3490',
    number: 9561016,
    timestamp: 1692696528,
    nonce: '0x0000000000000000',
    difficulty: 0,
    gasLimit: {
      type: 'BigNumber',
      hex: '0x01c9c380',
    },
    gasUsed: {
      type: 'BigNumber',
      hex: '0x0151cc8d',
    },
    miner: '0xf36F155486299eCAff2D4F5160ed5114C1f66000',
    extraData: '0xd883010b06846765746888676f312e32302e33856c696e7578',
    transactions: [
      '0x3cded88cd81054dbff6c02b7e8f64b434372d8c7aac344da518790fde71a4d08',
      '0xa16d3d4575eaf13089f6c9400378c5f12a7489dde307e57c3d203a01a9c8ae40',
      '0x448b1f322ef8904ac625447bd507a2903ed4980d515fc236acead51ea38799c6',
      '0xb5aa43ecf386f4db4be5338f4fffe1b8b965df93fbd50e5e4f7313588fe45c8d',
      '0xf44f8fea474b854255ef59da883c8db3540a7229ede92f798aefcba23a828ff6',
      '0x60daeced1d2f252c6f1fa84f2e5ae21cda7bb2efb744f3c957e74d0f8d390039',
      '0xf2de7321f3ca634a435fcd29ddf9ab5c8133de05c6d6b76c26d1f1f8d84ec302',
      '0xb70db7c684c515abe4bfa09c51629b428d789dcf4f49cedb0928d31d6a318c72',
      '0x3a9d78d021c4910ca33345af760acf4bc6c73e8337996f26986ccd0a5bfdb186',
      '0x146369331d92a40d471f38e72cc206a5563efe4cc7f92f31eb1096bb546adf5f',
      '0x982364bd934ad0b398ee974c30a2805a9aa75ddbe2eceba15382bc797d9b82fd',
      '0xc7068233e6ac2fb74fe6bc099c499fd6daba6f2d0fe966f4c9a51c347b239ce5',
      '0x7dd4639ed423be92730ea60d6f342254afc0845248555cc192cc695d2b1bdc2d',
      '0x9a6765953205f5db1f2c99948e3032ba929ab175863c17b7e7eb821779442df0',
      '0xdc6584cf4fff867fbe793ce4c01fd603d7f4c66b266130c3b4c2634ac294dfd4',
      '0x9af4077a08c450e267ba5c3777f9a97c6eff4684b2fdd374c8448d3e2ba6adad',
      '0x1c566b4f9867d6013755a50e2f34d14b547e2d7dd9c16c01ca016edbeac0dbb8',
      '0xc3259f18730381fba29f9ad829b5a4502444e9db85558964bd797c33282324e1',
      '0x25886282f8b74df07afabaea01b6b67d3213157aa9e4e1293bd5c8cfbdbf63d9',
      '0x34b99666fb8525abf05e9d5f0ee2482fca9e04624ac133cae217410b693a70c8',
      '0x3288f15b5e81d7ef0f5984b0c547cd9436364f05fb94c60b132c04a5562a90ab',
      '0x2e258e27c5bfbd2d3018a2f038cbeaf1bb22d0e79f17ddbd0322b94dba7f3adb',
      '0x3914c08271cd5fd978918fb394e6f4a1a3328296028a56ce7f65e793ae9d5504',
      '0xa57bde8f6dbd9729bcf87ec9a89f3acb8259044254ad356ce5b6709c10964506',
      '0xcc444b46df9d9f4a999ebc7864a23e233f9709080e7396170e4f6c3c112915dc',
      '0x3f6918e074e114e05238d58a7ccb73ad3420ba9fe6f1c575d651b43656be6ac4',
      '0x21770a2a886f3491265e5e03eab230b62ec95906187db3dc2b4e2defe79d54fb',
      '0xb9346f3884697683d33bfb6a56e9dbd0c04c730b2f3354dacbce6166ae78018f',
      '0x3d04d09f1d957bfa7d684a0e33f0622fbeba7a09ab5f01a75983f08cbec98479',
      '0x718def6daa3f6304481d41a4b5ead9b510e6304f9399e4d6b857d9fc08da33f6',
      '0x48a1af73098704859baa2d9a39580d240b92959acbdc83287099ec1c31a32979',
      '0x4d93149d0f92d6cfb4a658c0469a8b11c2ff0017bebd09f5826ae7d31bb54df1',
      '0x4260797d40ab2f8face29ed1b87364f2ec38868c322e993b7b1e187f3a31e1cd',
      '0xc40dac1c5824b44ddb1dcfdfd04ee3868a2cb59bd131831fb228fbdf39b4068c',
      '0x2c98568535bd85f46c2793bbebf4769f0d5f079d51eb9a41412fa5f346c0bffd',
      '0x289d2daa359fc8632050801d74574760b5796c1c0072d41e60d8009218e76794',
      '0x49674454c3000ba9a436582b9013337a60550921fefeb7259c0ae0a0b8de482c',
      '0x7f366250cc1bf05866d6518f200dd664f540cd3fc6ba78d1df7f2f4f2b0cbcb1',
      '0xe3347bf68348d0aa95da405cd77fd09a5925e241ce1ff8d34887a7f92720b79f',
      '0x0bebf96178139cb790ec9c618b3359368edba95f504949b0f698115eacc63468',
      '0x325747ac106e8190785c8300cb904499b5d54233b7c545e57bd5dbf3f408e77d',
      '0x1e8e9422b054d019caf2a6be92fac5c90b764106ed85fe471fa618b54290778b',
      '0xca01e24c6dfe11629bf25810a5857ef630e88f5427a7ee1190a28325e25d15a0',
      '0xb7ff9f03f4621339a4fb4052b30b1567895c40961d5214f2bab24d7dbc733d08',
      '0x70bf413d47b3b8f5c9c43fd8ce4c0a9f21369a768557a4f6f306ca9cbfb217a5',
      '0x6990b22d59461103c9dd337a436d2988b3248c8589bdf555f6436753d859f1d2',
      '0x446a5f972df5c13487cfc1ce9c7e6569591df5013f38941ae437094bfe61f726',
      '0xb50d479423d10efe69014b4fea028ea4f5bc85cc32cb762c55deaa26caf4e5e1',
      '0x708550d5bc1d0cbb2214425d3af94bc5f9fe5ac965af8c2dbd08656f49dd1786',
      '0x396218e6951d6c80a27f44f873c06fef0d39f2ff05ed292c25b780ec2f83edfb',
      '0x6ed75ca4696d252664cc406c53f9c097e35da4e1f5d57ae44b85c5a5e52a5217',
      '0xda2ea4bd41130a2a27f079229015500e81f57b7d512a782f9f44d01f52851669',
      '0xa1fa50a2d1fc843e41e7450389df9c98218b4aea9dcec2c9b340077517866f82',
      '0x96f84aadfeaf4e2bb77a24eef7bef66ac0deff381626860bfacc7f1af7390fc1',
      '0x261132c98d9f26b2fea8e72e0a199abaa73dbf179f1578aa53adc53fc2f42508',
      '0x3c3ba52cbd6394fcc51b1d1cafd7ead0490652b017edbb48ead4c42a25577f8c',
      '0xf7e062c4be7d1834c9cd854900861b964470a83eda546d20e897529854d3f57c',
      '0xe70e3b57a26e3119ef25918a621d6366d73be3413b43c9575e170d92e0e53e34',
      '0xb033de42f7536ad2e3d81e5812d4d50fb6bed8d942f0d6b92143d29ab4f4cc26',
      '0xd271542f7b6ce7d58a23197a48467c59f3f9599c1041167ffa710f4b7e2392ae',
      '0xe269a4435623cf727deb5fc05a2a663aceec297a69ce9a457e9a5bd56e993cb4',
      '0x519fbaba1b44eaea90d72c433f0c6a993e048fe76ce65361520d1ace87d8c42c',
      '0x9f28421985fe145eb411c28ac8e6265372a823de0e0298255d0b79900029e0c1',
      '0xcd9ac0aeb9c270b57b30805788c7aee365a9337972f299c2e8a5048062f9396e',
      '0xdcee5ba0a9a792c4ac00dea4e8d4a364bcda07ea8c5efe876d801642f8d0a039',
      '0x75ce3094ac83f584156353f60958bf9378be2a4d3bdb1c28e628da4f674dc17f',
      '0xb99f9373029d990c97d08ee52eaaebbdc80664e12b2da24b5140a785eb64d40e',
      '0x92730e72eec9902eb4e119c5972417358a0a906b5da971a07fbe4584f3bed614',
      '0xb22af72126126f5f0994effc10bac49620319c0ec62c4ea87bcaec4597cd56b7',
      '0xf279b409d8e72143b5e78fdd67485f5ffd71aac99a63597a49cd1d27ad67bb9f',
      '0x350fef81a680463503c66d71e63479d4ecea45a04a39c130fbba99e019b28af0',
      '0x8ba334ada09dad00b3899c4f84703caf533b4c11d642f9757d24beca7665d511',
      '0x13553d577fdfdc42c19b4132750d18978a081d8ada268a841b517208da515676',
      '0x4dc944bd9d3dde98ff0b58b3a9dcc90b3a10edb2150a6985d10297d0ef612110',
      '0xcad4475a11d5dcd8cd762e61db57f3832358b59f2f1a5ed314f2d5c4a81a4ae9',
      '0x81e2f40c01a27cfbaf491e9ff9586deb239507aa2c466d8346b4dce74c5949a9',
      '0x434f58cc108b98717a97eaa040b3a1bf39b7165b2862fba7bd16b181d9e15928',
      '0x9a08cf9fcdd1add7bfb0394981708668544e1d0efa311ce435656b9ad4650b26',
      '0x13aae04aa735765ef780a830019196cf0a8dae14ebd07aed25e1e2a010bd2da8',
      '0x75b94c9dedcc02988b5fe21451f5bbe555ba2719181c78f0d0329f17e46c9f48',
      '0x2fc76a795a4775dc11170e85b9e5deb2446c1b7fcef6c74b0ba5cbb074aa2dfb',
      '0x866440a9d190c8b512ae61df2d1e7c59dc8dcaae8ab0c98dc92067c1c0f6a8d8',
      '0xa2a38add2c8dcd4db2e88b151a2d1abecdab18423608f551a49f00dce0f452ca',
      '0xa4ee2e5bdea40f9d3600200997cc2dd54fd2b0b6e2a2799aea73d0aa96330c6f',
      '0xc8646fb5f7e4dfa88ec10162d13221101461758911176dfa1962407b81e57d85',
      '0x11c05cd70bb8ad993d0ffc1bb5d0fd1f49ab5dc27bb711702e0c2fc794ff2320',
      '0x3b8ec8f09ba1dab72b9b8422d079166d33289e7fea7873c2bd44b32df749acdc',
      '0x458f38355ab983014ea2423bec9d4576d2ec4b5a4604a438f1b1983518985d02',
      '0x41082ec1a7aa3504fcf2e360e1c47008a4680ae89c8c04334dfc6857f6cbeb2d',
      '0x6b58dc1cb69f6ce5cdcff6db3913722935d5bd3e7b16c5776d4201423a4d6f55',
      '0x2bff39f4453242ae3d34a87f4d7d0fc37e52f33fe20f9d3a81fe6802a95d9958',
      '0x137e266522839f3ab99107efaaee5ba01c5f6f178fba30ce5ecd886bc56a5539',
      '0x66b361ffc772051fb4d2460955b2decf000c082f1aefec9fff032f8eafde573c',
      '0xf74a507621272ad68ec310840790968df50ee04392b6f4248b93423c0441402f',
      '0x14f31fba90092021262a57b3b4d564678dd1d836fac59a7a77462f664f6e45c8',
      '0x5a7b886a48554ffd2e604f1f80d37b98178ed9499a17619745d11782a2afe6c3',
      '0x37e80bcec046e2d3a51e7ac8b4c368666bd911a81c4a0f0155c5e798cec138d7',
    ],
    baseFeePerGas: {
      type: 'BigNumber',
      hex: '0x0d',
    },
    _difficulty: {
      type: 'BigNumber',
      hex: '0x00',
    },
  },
  {
    hash: '0x8775059ef5e4275cbbcabdb82d0dd15701ecd4e25d1f3eab3c793ae69a1241db',
    parentHash:
      '0x938dee23b3975859c8b02d390b51cbae23bbeccab87c1688e5e0900e7a9d3490',
    number: 9561016,
    timestamp: 1692696528,
    nonce: '0x0000000000000000',
    difficulty: 0,
    gasLimit: {
      type: 'BigNumber',
      hex: '0x01c9c380',
    },
    gasUsed: {
      type: 'BigNumber',
      hex: '0x0151cc8d',
    },
    miner: '0xf36F155486299eCAff2D4F5160ed5114C1f66000',
    extraData: '0xd883010b06846765746888676f312e32302e33856c696e7578',
    transactions: [
      '0x3cded88cd81054dbff6c02b7e8f64b434372d8c7aac344da518790fde71a4d08',
      '0xa16d3d4575eaf13089f6c9400378c5f12a7489dde307e57c3d203a01a9c8ae40',
      '0x448b1f322ef8904ac625447bd507a2903ed4980d515fc236acead51ea38799c6',
      '0xb5aa43ecf386f4db4be5338f4fffe1b8b965df93fbd50e5e4f7313588fe45c8d',
      '0xf44f8fea474b854255ef59da883c8db3540a7229ede92f798aefcba23a828ff6',
      '0x60daeced1d2f252c6f1fa84f2e5ae21cda7bb2efb744f3c957e74d0f8d390039',
      '0xf2de7321f3ca634a435fcd29ddf9ab5c8133de05c6d6b76c26d1f1f8d84ec302',
      '0xb70db7c684c515abe4bfa09c51629b428d789dcf4f49cedb0928d31d6a318c72',
      '0x3a9d78d021c4910ca33345af760acf4bc6c73e8337996f26986ccd0a5bfdb186',
      '0x146369331d92a40d471f38e72cc206a5563efe4cc7f92f31eb1096bb546adf5f',
      '0x982364bd934ad0b398ee974c30a2805a9aa75ddbe2eceba15382bc797d9b82fd',
      '0xc7068233e6ac2fb74fe6bc099c499fd6daba6f2d0fe966f4c9a51c347b239ce5',
      '0x7dd4639ed423be92730ea60d6f342254afc0845248555cc192cc695d2b1bdc2d',
      '0x9a6765953205f5db1f2c99948e3032ba929ab175863c17b7e7eb821779442df0',
      '0xdc6584cf4fff867fbe793ce4c01fd603d7f4c66b266130c3b4c2634ac294dfd4',
      '0x9af4077a08c450e267ba5c3777f9a97c6eff4684b2fdd374c8448d3e2ba6adad',
      '0x1c566b4f9867d6013755a50e2f34d14b547e2d7dd9c16c01ca016edbeac0dbb8',
      '0xc3259f18730381fba29f9ad829b5a4502444e9db85558964bd797c33282324e1',
      '0x25886282f8b74df07afabaea01b6b67d3213157aa9e4e1293bd5c8cfbdbf63d9',
      '0x34b99666fb8525abf05e9d5f0ee2482fca9e04624ac133cae217410b693a70c8',
      '0x3288f15b5e81d7ef0f5984b0c547cd9436364f05fb94c60b132c04a5562a90ab',
      '0x2e258e27c5bfbd2d3018a2f038cbeaf1bb22d0e79f17ddbd0322b94dba7f3adb',
      '0x3914c08271cd5fd978918fb394e6f4a1a3328296028a56ce7f65e793ae9d5504',
      '0xa57bde8f6dbd9729bcf87ec9a89f3acb8259044254ad356ce5b6709c10964506',
      '0xcc444b46df9d9f4a999ebc7864a23e233f9709080e7396170e4f6c3c112915dc',
      '0x3f6918e074e114e05238d58a7ccb73ad3420ba9fe6f1c575d651b43656be6ac4',
      '0x21770a2a886f3491265e5e03eab230b62ec95906187db3dc2b4e2defe79d54fb',
      '0xb9346f3884697683d33bfb6a56e9dbd0c04c730b2f3354dacbce6166ae78018f',
      '0x3d04d09f1d957bfa7d684a0e33f0622fbeba7a09ab5f01a75983f08cbec98479',
      '0x718def6daa3f6304481d41a4b5ead9b510e6304f9399e4d6b857d9fc08da33f6',
      '0x48a1af73098704859baa2d9a39580d240b92959acbdc83287099ec1c31a32979',
      '0x4d93149d0f92d6cfb4a658c0469a8b11c2ff0017bebd09f5826ae7d31bb54df1',
      '0x4260797d40ab2f8face29ed1b87364f2ec38868c322e993b7b1e187f3a31e1cd',
      '0xc40dac1c5824b44ddb1dcfdfd04ee3868a2cb59bd131831fb228fbdf39b4068c',
      '0x2c98568535bd85f46c2793bbebf4769f0d5f079d51eb9a41412fa5f346c0bffd',
      '0x289d2daa359fc8632050801d74574760b5796c1c0072d41e60d8009218e76794',
      '0x49674454c3000ba9a436582b9013337a60550921fefeb7259c0ae0a0b8de482c',
      '0x7f366250cc1bf05866d6518f200dd664f540cd3fc6ba78d1df7f2f4f2b0cbcb1',
      '0xe3347bf68348d0aa95da405cd77fd09a5925e241ce1ff8d34887a7f92720b79f',
      '0x0bebf96178139cb790ec9c618b3359368edba95f504949b0f698115eacc63468',
      '0x325747ac106e8190785c8300cb904499b5d54233b7c545e57bd5dbf3f408e77d',
      '0x1e8e9422b054d019caf2a6be92fac5c90b764106ed85fe471fa618b54290778b',
      '0xca01e24c6dfe11629bf25810a5857ef630e88f5427a7ee1190a28325e25d15a0',
      '0xb7ff9f03f4621339a4fb4052b30b1567895c40961d5214f2bab24d7dbc733d08',
      '0x70bf413d47b3b8f5c9c43fd8ce4c0a9f21369a768557a4f6f306ca9cbfb217a5',
      '0x6990b22d59461103c9dd337a436d2988b3248c8589bdf555f6436753d859f1d2',
      '0x446a5f972df5c13487cfc1ce9c7e6569591df5013f38941ae437094bfe61f726',
      '0xb50d479423d10efe69014b4fea028ea4f5bc85cc32cb762c55deaa26caf4e5e1',
      '0x708550d5bc1d0cbb2214425d3af94bc5f9fe5ac965af8c2dbd08656f49dd1786',
      '0x396218e6951d6c80a27f44f873c06fef0d39f2ff05ed292c25b780ec2f83edfb',
      '0x6ed75ca4696d252664cc406c53f9c097e35da4e1f5d57ae44b85c5a5e52a5217',
      '0xda2ea4bd41130a2a27f079229015500e81f57b7d512a782f9f44d01f52851669',
      '0xa1fa50a2d1fc843e41e7450389df9c98218b4aea9dcec2c9b340077517866f82',
      '0x96f84aadfeaf4e2bb77a24eef7bef66ac0deff381626860bfacc7f1af7390fc1',
      '0x261132c98d9f26b2fea8e72e0a199abaa73dbf179f1578aa53adc53fc2f42508',
      '0x3c3ba52cbd6394fcc51b1d1cafd7ead0490652b017edbb48ead4c42a25577f8c',
      '0xf7e062c4be7d1834c9cd854900861b964470a83eda546d20e897529854d3f57c',
      '0xe70e3b57a26e3119ef25918a621d6366d73be3413b43c9575e170d92e0e53e34',
      '0xb033de42f7536ad2e3d81e5812d4d50fb6bed8d942f0d6b92143d29ab4f4cc26',
      '0xd271542f7b6ce7d58a23197a48467c59f3f9599c1041167ffa710f4b7e2392ae',
      '0xe269a4435623cf727deb5fc05a2a663aceec297a69ce9a457e9a5bd56e993cb4',
      '0x519fbaba1b44eaea90d72c433f0c6a993e048fe76ce65361520d1ace87d8c42c',
      '0x9f28421985fe145eb411c28ac8e6265372a823de0e0298255d0b79900029e0c1',
      '0xcd9ac0aeb9c270b57b30805788c7aee365a9337972f299c2e8a5048062f9396e',
      '0xdcee5ba0a9a792c4ac00dea4e8d4a364bcda07ea8c5efe876d801642f8d0a039',
      '0x75ce3094ac83f584156353f60958bf9378be2a4d3bdb1c28e628da4f674dc17f',
      '0xb99f9373029d990c97d08ee52eaaebbdc80664e12b2da24b5140a785eb64d40e',
      '0x92730e72eec9902eb4e119c5972417358a0a906b5da971a07fbe4584f3bed614',
      '0xb22af72126126f5f0994effc10bac49620319c0ec62c4ea87bcaec4597cd56b7',
      '0xf279b409d8e72143b5e78fdd67485f5ffd71aac99a63597a49cd1d27ad67bb9f',
      '0x350fef81a680463503c66d71e63479d4ecea45a04a39c130fbba99e019b28af0',
      '0x8ba334ada09dad00b3899c4f84703caf533b4c11d642f9757d24beca7665d511',
      '0x13553d577fdfdc42c19b4132750d18978a081d8ada268a841b517208da515676',
      '0x4dc944bd9d3dde98ff0b58b3a9dcc90b3a10edb2150a6985d10297d0ef612110',
      '0xcad4475a11d5dcd8cd762e61db57f3832358b59f2f1a5ed314f2d5c4a81a4ae9',
      '0x81e2f40c01a27cfbaf491e9ff9586deb239507aa2c466d8346b4dce74c5949a9',
      '0x434f58cc108b98717a97eaa040b3a1bf39b7165b2862fba7bd16b181d9e15928',
      '0x9a08cf9fcdd1add7bfb0394981708668544e1d0efa311ce435656b9ad4650b26',
      '0x13aae04aa735765ef780a830019196cf0a8dae14ebd07aed25e1e2a010bd2da8',
      '0x75b94c9dedcc02988b5fe21451f5bbe555ba2719181c78f0d0329f17e46c9f48',
      '0x2fc76a795a4775dc11170e85b9e5deb2446c1b7fcef6c74b0ba5cbb074aa2dfb',
      '0x866440a9d190c8b512ae61df2d1e7c59dc8dcaae8ab0c98dc92067c1c0f6a8d8',
      '0xa2a38add2c8dcd4db2e88b151a2d1abecdab18423608f551a49f00dce0f452ca',
      '0xa4ee2e5bdea40f9d3600200997cc2dd54fd2b0b6e2a2799aea73d0aa96330c6f',
      '0xc8646fb5f7e4dfa88ec10162d13221101461758911176dfa1962407b81e57d85',
      '0x11c05cd70bb8ad993d0ffc1bb5d0fd1f49ab5dc27bb711702e0c2fc794ff2320',
      '0x3b8ec8f09ba1dab72b9b8422d079166d33289e7fea7873c2bd44b32df749acdc',
      '0x458f38355ab983014ea2423bec9d4576d2ec4b5a4604a438f1b1983518985d02',
      '0x41082ec1a7aa3504fcf2e360e1c47008a4680ae89c8c04334dfc6857f6cbeb2d',
      '0x6b58dc1cb69f6ce5cdcff6db3913722935d5bd3e7b16c5776d4201423a4d6f55',
      '0x2bff39f4453242ae3d34a87f4d7d0fc37e52f33fe20f9d3a81fe6802a95d9958',
      '0x137e266522839f3ab99107efaaee5ba01c5f6f178fba30ce5ecd886bc56a5539',
      '0x66b361ffc772051fb4d2460955b2decf000c082f1aefec9fff032f8eafde573c',
      '0xf74a507621272ad68ec310840790968df50ee04392b6f4248b93423c0441402f',
      '0x14f31fba90092021262a57b3b4d564678dd1d836fac59a7a77462f664f6e45c8',
      '0x5a7b886a48554ffd2e604f1f80d37b98178ed9499a17619745d11782a2afe6c3',
      '0x37e80bcec046e2d3a51e7ac8b4c368666bd911a81c4a0f0155c5e798cec138d7',
    ],
    baseFeePerGas: {
      type: 'BigNumber',
      hex: '0x0d',
    },
    _difficulty: {
      type: 'BigNumber',
      hex: '0x00',
    },
  },
];
