import * as React from 'react';
import { createDevTools, IDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export const DevToolsContainer: IDevTools = createDevTools(
	<DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-w">
		<LogMonitor />
	</DockMonitor>
);