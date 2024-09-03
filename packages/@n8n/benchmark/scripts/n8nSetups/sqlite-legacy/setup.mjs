#!/usr/bin/env zx

import path from 'path';
import { fs } from 'zx';

/**
 * Creates the needed directories for the queue setup so their
 * permissions get set correctly.
 */
export function setup({ runDir }) {
	const neededDirs = ['n8n'];

	for (const dir of neededDirs) {
		fs.ensureDirSync(path.join(runDir, dir));
	}
}
