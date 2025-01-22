import BitcoinImage from "../assets/crypto/bitcoin.png";
import EthereumImage from "../assets/crypto/etherium.png";
import DogecoinImage from "../assets/crypto/dogecoin.png";
import BitcoinQr from "../assets/qr/BTC.jpeg";
import EthereumQr from "../assets/qr/ETH.jpeg";
import DogeQr from "../assets/qr/DOGE.jpeg";
import USDTQr from "../assets/qr/USDT.jpeg";
import { setWalletQr } from "../lib/atoms";

const items = [
	{
		image: BitcoinImage,
		title: "Bitcoin",
		key: "bitcoin",
		qr: BitcoinQr,
		addr: "bc1q8u7vmkjc0qy87tt4ua2phtfzwtdr9tdfd73ehm",
	},

	{
		image: EthereumImage,
		title: "Ethereum",
		key: "ethereum",
		qr: EthereumQr,
		addr: "0x959b22bC18CA922CaaDBcF0b90ED0A6006705788",
	},

	{
		image: DogecoinImage,
		title: "Dogecoin",
		key: "dogecoin",
		qr: DogeQr,
		addr: "DDCuWE2dh4rsyYab2rHCMo65k1wNNMMYME",
	},

	{
		image: EthereumImage,
		title: "USDT (ERC20)",
		key: "usdt",
		qr: USDTQr,
	},
];

function Balances({ account }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2  2xl:grid-cols-4 gap-6 lg:gap-8">
			{items.map((v, i) => {
				return (
					<div key={i} className="bg-bg3 pb-4 rounded-md p-6">
						<div key={i} className="bg-bg3  rounded-md  pb-2 w-full flex flex-row justify-between items-center ">
							<div className="flex flex-col space-y-2">
								<span className="text-xl  text-text1"> {v.title} </span>

								<span className="text-2xl lg:text-2xl font-semibold"> $ {account[v.key]}</span>
							</div>

							<div className="self-start">
								<img src={v.image} alt="bitcoin" className="" />
							</div>
						</div>

						<div className="self-center w-full flex flex-row justify-start items-center mt-2">
							<div className="flex flex-row justify-around items-center gap-8">
								<button
									disabled={!v.qr}
									onClick={() => {
										if (!v.qr) return;
										setWalletQr({
											img: v.qr,
											show: true,
											address: v.addr || "",
										});
									}}
									className="px-4 disabled:opacity-40 disabled:pointer-events-none py-1 border-[1px] border-white/40 hover:border-white/80 hover:bg-bg2 text-sm rounded-md text-center font-normal text-white/80 transition-flow"
								>
									Deposit
								</button>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Balances;
