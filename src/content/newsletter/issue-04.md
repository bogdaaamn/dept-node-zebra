---
title: "Issue #04"
tagline: "The one about JavaScript security, Node observability, and building GovSlack"
date: "2023-02-16"
length: 2
---

## Node weekly

- [JavaScript Applications Have Fewer Flaws Than Java and .NET](https://dub.sh/ycUypk3): Don't shoot the messenger, but Veracode's [State of Software Security](https://dub.sh/F8feF3d) report for 2023 found that JavaScript applications have fewer flaws and faster flaw resolution. The report includes all the applications scanned within the Veracode platform and includes a list of recommendations to drive the remediation curve down.
- [How to monitor a Node.js application](https://dub.sh/L04qYnl): From the New Relic friends, a quick write up about Node observability and monitoring. The article also includes a walk through the new New Relic Node.js starter kit.
- [What We Learned from Building GovSlack](https://dub.sh/PkuPlaM): Yet another huge architectural challenge read from Slack. The article walks through environment and pipeline isolation, Terraform deployments, authentication, and other challenges faced on the way.
- [SQLite WASM – Something subtle in your browser](https://dub.sh/g5yZNKy): In other WebAssembly shenanigans, Zainab finds a creative way to use the browser filesystem to store and use a SQLite. Not sure if is it performant, worth the effort, or widely supported, but for sure it's a nice experiment.
- [How to write instructions for a non-technical audience](https://dub.sh/dGGatnB): A seven rules outline on how to write technical information more accessible and engaging for a non-technical audience.

## Tools of the week

- [docker rollout](https://dub.sh/YJyuh2a): Docker CLI plugin that updates Docker Compose services without downtime.
- [envless](https://dub.sh/IvGTkPe): Open source and secure way to share and manage secrets across teams.
