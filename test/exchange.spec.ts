import { expect, test } from "bun:test";
import ucrypt from "../src/index";

const crypto = new ucrypt();

test("exchange", () => {
	const start_payload = crypto.exchange.start_exchange();
	expect(start_payload.status).toBe(true);
	expect(start_payload.data).toBeObject();

	const start_data = start_payload.data;
	expect(start_data).not.toBeInstanceOf(Error);
	if (start_data instanceof Error) return;

	const end_secret = crypto.exchange.finish_exchange(
		{
			g: start_data[0].g,
			p: start_data[0].p,
			s: start_data[0].s
		},
		s => {
			expect(s).toBeNumber();

			const start_secret = s ** start_data[1] % start_data[0].p;

			expect(end_secret.status).toBe(true);
			expect(start_secret).toBe(end_secret.data as number);
		}
	);
});
