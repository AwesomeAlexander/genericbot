// Imports
import * as Discord from 'discord.js';
import { Command, logger, config } from './utils/exports';
import client from './generateClient';

client.login(config.token);