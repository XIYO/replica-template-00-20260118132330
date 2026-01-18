# Replica Template

Cloudflare Workers에 자동 배포되는 Astro + Starlight 문서 사이트 템플릿.

## 빠른 시작 (CLI)

### 1. 템플릿에서 새 레포 생성

```bash
# Public
gh repo create {owner}/{repo-name} --template xiyo/replica-template-00 --public

# Private
gh repo create {owner}/{repo-name} --template xiyo/replica-template-00 --private
```

### 2. Secrets 설정

```bash
REPO="{owner}/{repo-name}"

gh secret set CLOUDFLARE_API_KEY --repo "$REPO" --body "{your-api-key}"
gh secret set CLOUDFLARE_EMAIL --repo "$REPO" --body "{your-email}"
gh secret set CLOUDFLARE_ACCOUNT_ID --repo "$REPO" --body "{your-account-id}"
gh secret set CLOUDFLARE_ZONE_ID --repo "$REPO" --body "{your-zone-id}"
```

### 3. Variables 설정

```bash
gh variable set SITE_SUBDOMAIN --repo "$REPO" --body "{your-subdomain}"
```

### 4. 배포 실행

```bash
gh workflow run deploy.yml --repo "$REPO" --ref main
```

### 5. 결과 확인

```bash
gh run list --repo "$REPO" --limit 1
```

배포 완료 후 `https://{your-subdomain}.xiyo.dev` 접속

## 배포 설정 (웹 UI)

GitHub Repository Settings에서 수동으로 설정할 수도 있습니다.

### Variables

`Settings > Secrets and variables > Actions > Variables`

| Name | 설명 | 예시 |
|------|------|------|
| `SITE_SUBDOMAIN` | 사이트 서브도메인 | `my-docs` |

### Secrets

`Settings > Secrets and variables > Actions > Secrets`

| Name | 설명 |
|------|------|
| `CLOUDFLARE_API_KEY` | Cloudflare Global API Key |
| `CLOUDFLARE_EMAIL` | Cloudflare 계정 이메일 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID |
| `CLOUDFLARE_ZONE_ID` | 도메인 Zone ID |

### 배포 실행

- `main` 브랜치에 푸시하면 자동 배포
- 또는 `Actions > Deploy to Cloudflare Workers > Run workflow` 수동 실행

### 설정 누락 시

필수 값이 누락되면 빌드가 실패하며, 어떤 값이 누락되었는지 에러 메시지로 표시됩니다.

## 로컬 개발

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

## 프로젝트 구조

```text
.
├── src/
│   ├── content/docs/   # 문서 파일 (.md, .mdx)
│   ├── assets/         # 이미지
│   └── styles/         # 커스텀 CSS
├── public/             # 정적 파일 (favicon 등)
├── site.config.json    # 사이트 설정
├── astro.config.mjs    # Astro 설정
└── wrangler.toml       # Cloudflare Workers 설정
```

## 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 실행 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm preview` | 빌드 미리보기 |

## SEO 설정

배포 시 자동으로 SEO 관련 파일이 생성되고 Google에 등록됩니다.

### 자동 생성 파일

| 파일 | 설명 |
|------|------|
| `robots.txt` | `SITE_SUBDOMAIN` 변수로 동적 생성 |
| `sitemap-index.xml` | Astro가 자동 생성 |

### Google Search Console 연동

배포 시 GitHub Actions가 자동으로 sitemap을 Google Search Console에 제출합니다.

- **인증 방식**: GCP Workload Identity Federation (키 없음)
- **대상 도메인**: `sc-domain:xiyo.dev` (모든 서브도메인 포함)
- **제출 sitemap**: `https://{subdomain}.xiyo.dev/sitemap-index.xml`

별도 설정 없이 `SITE_SUBDOMAIN` 변수만 설정하면 자동으로 Google에 등록됩니다.

## 참고

- [Starlight Docs](https://starlight.astro.build/)
- [Astro Docs](https://docs.astro.build)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
