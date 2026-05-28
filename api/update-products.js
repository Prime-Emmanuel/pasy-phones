// api/update-products.js
export default async function handler(req, res) {
  // 1. Admin password check
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { products } = req.body;
    if (!products || !products.phones) {
      return res.status(400).json({ error: 'Invalid products data' });
    }

    // 2. Build the new file content (preserving formatPrice)
    const newFileContent = `export const products = ${JSON.stringify(products, null, 2)};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US').format(price) + ' FCFA';
};
`;

    // 3. GitHub API details
    const owner = 'Prime-Emmanuel';   // your GitHub username
    const repo = 'pasy-phones';       // your repo name
    const path = 'src/data/products.js';
    const branch = 'main';            // or 'master' if that's your default branch

    // Get the current file's SHA (required to update)
    const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    const getFileRes = await fetch(getUrl, {
      headers: { Authorization: `token ${process.env.GH_TOKEN}` }
    });
    if (!getFileRes.ok) throw new Error('Failed to fetch file info');
    const fileData = await getFileRes.json();
    const sha = fileData.sha;

    // 4. Commit the updated file
    const updateUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const body = JSON.stringify({
      message: 'Update products via admin panel',
      content: Buffer.from(newFileContent).toString('base64'),
      sha: sha,
      branch: branch
    });

    const updateRes = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${process.env.GH_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: body
    });

    if (!updateRes.ok) {
      const err = await updateRes.json();
      throw new Error(err.message || 'Update failed');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
