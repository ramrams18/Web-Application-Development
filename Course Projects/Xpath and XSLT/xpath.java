package xpath;

import javax.xml.xpath.*;
import org.xml.sax.InputSource;
import org.w3c.dom.*;

class XPATH {

	static void print(Node e) {

		if (e instanceof Text) {
			System.out.print(((Text) e).getData());
		}

		else {

			NodeList c = e.getChildNodes();
			System.out.print("<" + e.getNodeName());
			NamedNodeMap attributes = e.getAttributes();
			for (int i = 0; i < attributes.getLength(); i++)
				System.out.print(
						" " + attributes.item(i).getNodeName() + "=\"" + attributes.item(i).getNodeValue() + "\"");
			System.out.print(">");
			for (int k = 0; k < c.getLength(); k++)
				print(c.item(k));
			System.out.print("</" + e.getNodeName() + ">");
		}
	}

	static void eval(String query, String document) throws Exception {

		XPathFactory xpathFactory = XPathFactory.newInstance();
		XPath xpath = xpathFactory.newXPath();
		InputSource inputSource = new InputSource(document);
		NodeList result = (NodeList) xpath.evaluate(query, inputSource, XPathConstants.NODESET);
		System.out.println("XPath query: " + query);

		for (int i = 0; i < result.getLength(); i++)
			print(result.item(i));

		System.out.println();
	}

	public static void main(String[] args) throws Exception {

		/* titles of all articles whose one of the authors is David Maier. */
		eval("//SigmodRecord/issue/articles/article[authors/author='David Maier']/title", "SigmodRecord.xml");
		System.out.println();

		/* titles of all articles whose first author is David Maier. */
		eval("//SigmodRecord/issue/articles/article[authors/author[@position='00']='David Maier']/title",
				"SigmodRecord.xml");
		System.out.println();

		/*
		 * titles of all articles whose authors include David Maier and Stanley B.
		 * Zdonik.
		 */
		eval("//SigmodRecord/issue/articles/article[authors/author='David Maier' and authors/author='Stanley B. Zdonik']/title",
				"SigmodRecord.xml");
		System.out.println();

		/* titles of all articles in volume 19/number 2. */
		eval("//SigmodRecord/issue[volume=19 and number=2]/articles/article/title", "SigmodRecord.xml");
		System.out.println();

		/*
		 * titles and the init/end pages of all articles in volume 19/number 2 whose
		 * authors include Jim Gray.
		 */
		eval("//SigmodRecord/issue[volume=19 and number=2]/articles/article/title | //SigmodRecord/issue[volume=19 and number=2]/articles/article/initPage | //SigmodRecord/issue[volume=19 and number=2]/articles/article/endPage",
				"SigmodRecord.xml");
		System.out.println();

		/*
		 * volume and number of all articles whose authors include David Maier. (note:
		 * we need the number entry of an article, not the number of articles).
		 */
		eval("//SigmodRecord/issue[articles/article/authors/author='David Maier']/volume | //SigmodRecord/issue[articles/article/authors/author='David Maier']/number", "SigmodRecord.xml");
		System.out.println();

	}
}
