<xsl:stylesheet version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<body>
				<h1>
					<xsl:value-of select="//collection/description" />
				</h1>
				<xsl:for-each select="//recipe">
					<fieldset>

						<legend>
							<h2>
								<xsl:value-of select="title" />
							</h2>
						</legend>

						<strong>Date: </strong>
						<xsl:value-of select="date" />
						<br />
						<br />
						<strong>Ingredients:</strong>
						<br />
						<ul>
							<xsl:for-each select="ingredient">
								<li>
									<xsl:value-of select="@name" />
									<xsl:if test="@amount">
										<xsl:text> - </xsl:text>
										<xsl:value-of select="@amount" />
									</xsl:if>
									<xsl:if test="@unit">
										<xsl:text> </xsl:text>
										<xsl:value-of select="@unit" />
									</xsl:if>
								</li>
							</xsl:for-each>
						</ul>
						<br />
						<strong>Preparation:</strong>
						<br />
						<ol>
							<xsl:for-each select="preparation/step">
								<li>
									<xsl:value-of select="." />
								</li>
							</xsl:for-each>
						</ol>
						<xsl:if test="comment">
							<strong>Comment:</strong>
							<br />
							<xsl:value-of select="comment" />
							<br />
							<br />
						</xsl:if>
						<strong>Nutrition: </strong>
						<xsl:if test="nutrition/@calories">
							<xsl:text>Calories: </xsl:text>
							<xsl:value-of select="nutrition/@calories" />
							<xsl:text>, </xsl:text>
						</xsl:if>
						<xsl:if test="nutrition/@fat">
							<xsl:text>Fat: </xsl:text>
							<xsl:value-of select="nutrition/@fat" />
							<xsl:text>, </xsl:text>
						</xsl:if>
						<xsl:if test="nutrition/@carbohydrates">
							<xsl:text>Carbohydrates: </xsl:text>
							<xsl:value-of select="nutrition/@carbohydrates" />
							<xsl:text>, </xsl:text>
						</xsl:if>
						<xsl:if test="nutrition/@protein">
							<xsl:text>Protein: </xsl:text>
							<xsl:value-of select="nutrition/@protein" />
						</xsl:if>
						<xsl:if test="nutrition/@alcohol">
							<xsl:text>, Alcohol: </xsl:text>
							<xsl:value-of select="nutrition/@alcohol" />
						</xsl:if>

						<!-- calories="8892" fat="33%" carbohydrates="28%" protein="39%" -->
						<br />
					</fieldset>
				</xsl:for-each>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
